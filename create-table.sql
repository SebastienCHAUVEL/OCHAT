DROP TABLE IF EXISTS "message";

DROP TABLE IF EXISTS "conversation";

DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" VARCHAR(128) NOT NULL UNIQUE,
    "password" VARCHAR(128) NOT NULL
);

CREATE TABLE "conversation" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(128) NOT NULL,
    "user_id" INT REFERENCES "user" ("id")
);

CREATE TABLE "message" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT NOT NULL,
    "is_ai_response" BOOLEAN NOT NULL,
    "conversation_id" INT REFERENCES "conversation" ("id") ON DELETE CASCADE
);