'''
Business: Get user's purchased tracks by email
Args: event with httpMethod, queryStringParameters (email); context with request_id
Returns: HTTP response with list of purchased tracks
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    user_email = params.get('email')
    
    if not user_email:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email parameter required'}),
            'isBase64Encoded': False
        }
    
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
    
    cursor.execute(
        """
        SELECT id, track_id, track_title, track_artist, amount, payment_id, 
               status, created_at, paid_at
        FROM purchases 
        WHERE user_email = %s AND status = 'succeeded'
        ORDER BY paid_at DESC
        """,
        (user_email,)
    )
    
    purchases = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for purchase in purchases:
        result.append({
            'id': purchase['id'],
            'trackId': purchase['track_id'],
            'trackTitle': purchase['track_title'],
            'trackArtist': purchase['track_artist'],
            'amount': float(purchase['amount']),
            'paymentId': purchase['payment_id'],
            'status': purchase['status'],
            'createdAt': purchase['created_at'].isoformat() if purchase['created_at'] else None,
            'paidAt': purchase['paid_at'].isoformat() if purchase['paid_at'] else None
        })
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'purchases': result, 'count': len(result)}),
        'isBase64Encoded': False
    }
