'''
Business: Process YooKassa payment webhooks and record purchases
Args: event with httpMethod, body, headers; context with request_id
Returns: HTTP response with statusCode 200/400
'''

import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    webhook_data = json.loads(body_str)
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    event_type = webhook_data.get('event')
    payment_object = webhook_data.get('object', {})
    payment_id = payment_object.get('id')
    
    cursor.execute(
        "INSERT INTO webhook_logs (payment_id, event_type, payload, processed) VALUES (%s, %s, %s, %s)",
        (payment_id, event_type, json.dumps(webhook_data), False)
    )
    
    if event_type == 'payment.succeeded':
        status = payment_object.get('status')
        if status == 'succeeded':
            amount = float(payment_object.get('amount', {}).get('value', 0))
            description = payment_object.get('description', '')
            metadata = payment_object.get('metadata', {})
            
            user_email = metadata.get('email', 'unknown@email.com')
            track_id = metadata.get('track_id', 0)
            track_title = metadata.get('track_title', 'Unknown')
            track_artist = metadata.get('track_artist', 'Unknown')
            
            cursor.execute(
                """
                INSERT INTO purchases (user_email, track_id, track_title, track_artist, amount, payment_id, status, paid_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (payment_id) DO UPDATE SET status = 'succeeded', paid_at = EXCLUDED.paid_at
                """,
                (user_email, track_id, track_title, track_artist, amount, payment_id, 'succeeded', datetime.utcnow())
            )
            
            cursor.execute(
                "UPDATE webhook_logs SET processed = TRUE WHERE payment_id = %s",
                (payment_id,)
            )
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'status': 'ok', 'event': event_type}),
        'isBase64Encoded': False
    }
