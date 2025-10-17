-- Таблица для хранения покупок треков пользователями
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    track_id INTEGER NOT NULL,
    track_title VARCHAR(255) NOT NULL,
    track_artist VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_purchases_track_id ON purchases(track_id);
CREATE INDEX IF NOT EXISTS idx_purchases_payment_id ON purchases(payment_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

-- Таблица для логов webhook-ов ЮKassa
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255),
    event_type VARCHAR(100),
    payload TEXT,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_payment_id ON webhook_logs(payment_id);
