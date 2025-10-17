'''
Business: Generate secure download link for purchased track
Args: event with httpMethod, queryStringParameters (email, track_id); context with request_id
Returns: HTTP response with download URL for the track
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

TRACK_URLS = {
    1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    4: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    5: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    6: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
}

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
    track_id_str = params.get('track_id')
    
    if not user_email or not track_id_str:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email and track_id parameters required'}),
            'isBase64Encoded': False
        }
    
    try:
        track_id = int(track_id_str)
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid track_id'}),
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
        SELECT id, track_title, track_artist 
        FROM purchases 
        WHERE user_email = %s AND track_id = %s AND status = 'succeeded'
        LIMIT 1
        """,
        (user_email, track_id)
    )
    
    purchase = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not purchase:
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Track not purchased or access denied'}),
            'isBase64Encoded': False
        }
    
    download_url = TRACK_URLS.get(track_id)
    if not download_url:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Track file not found'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'downloadUrl': download_url,
            'trackTitle': purchase['track_title'],
            'trackArtist': purchase['track_artist'],
            'filename': f"{purchase['track_title']} - {purchase['track_artist']}.mp3"
        }),
        'isBase64Encoded': False
    }
