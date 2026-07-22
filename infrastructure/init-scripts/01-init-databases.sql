-- =============================================================================
-- Database-per-Service Architecture Initialization Script
-- Creates isolated databases for each microservice
-- =============================================================================

-- 1. Create Separate Databases for Microservices
CREATE DATABASE auth_db;
CREATE DATABASE user_db;
CREATE DATABASE wearable_db;
CREATE DATABASE health_db;
CREATE DATABASE blacklist_db;
CREATE DATABASE history_db;

-- -----------------------------------------------------------------------------
-- 2. Auth Service Database (auth_db)
-- -----------------------------------------------------------------------------
\c auth_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_auth (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_auth (id, email, password_hash, full_name, role)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'demo@mss.com', '$2a$10$e8wEaLq4H7N2ZtJ4wK9s.O2d9/1X3W0X9Y8Z7A6B5C4D3E2F1G0H', 'Nguyễn Văn Demo')
ON CONFLICT (email) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. User Service Database (user_db)
-- -----------------------------------------------------------------------------
\c user_db;

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    height_cm DOUBLE PRECISION NOT NULL,
    weight_kg DOUBLE PRECISION NOT NULL,
    fitness_goal VARCHAR(50) NOT NULL,
    activity_level VARCHAR(50) NOT NULL,
    bmr DOUBLE PRECISION,
    tdee DOUBLE PRECISION,
    target_calories DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_profiles (user_id, age, gender, height_cm, weight_kg, fitness_goal, activity_level, bmr, tdee, target_calories)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 25, 'MALE', 175.0, 70.0, 'LOSE_WEIGHT', 'MODERATELY_ACTIVE', 1680.0, 2604.0, 2104.0)
ON CONFLICT (user_id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 4. Wearable Sync Service Database (wearable_db)
-- -----------------------------------------------------------------------------
\c wearable_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS wearable_sync_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    provider VARCHAR(50),
    processed_points INT,
    status VARCHAR(50),
    synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 5. Health Assessment Service Database (health_db)
-- -----------------------------------------------------------------------------
\c health_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS health_assessment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    fri_score DOUBLE PRECISION,
    status VARCHAR(50),
    alpha_intensity DOUBLE PRECISION,
    current_rhr DOUBLE PRECISION,
    base_rhr DOUBLE PRECISION,
    sleep_hours DOUBLE PRECISION,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\c blacklist_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS food_blacklist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    food_name VARCHAR(255) NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS food_allergies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    allergen VARCHAR(255) NOT NULL,
    severity VARCHAR(50) DEFAULT 'HIGH',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO food_blacklist (user_id, food_name, reason)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'cần tây', 'DISLIKE');

INSERT INTO food_allergies (user_id, allergen, severity)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'SEAFOOD', 'HIGH');

-- -----------------------------------------------------------------------------
-- 5. History & Analytics Service Database (history_db)
-- -----------------------------------------------------------------------------
\c history_db;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS recommendation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    fri_score DOUBLE PRECISION,
    health_status VARCHAR(50),
    target_calories DOUBLE PRECISION,
    meals_json TEXT,
    workouts_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
