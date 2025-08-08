-- Example Supabase schema for AncientLingo

-- Table: profiles (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Table: user progress (levels, streaks, badges)
create table if not exists user_progress (
  user_id uuid references profiles(id) not null,
  language text not null,
  level integer default 1,
  streak_count integer default 0,
  badge_count integer default 0,
  updated_at timestamp with time zone default now(),
  primary key (user_id, language)
);

-- Table: vocabulary items saved by users
create table if not exists vocabulary_bank (
  id bigserial primary key,
  user_id uuid references profiles(id) not null,
  language text not null,
  lemma text not null,
  gloss text,
  created_at timestamp with time zone default now()
);

-- Table: spaced repetition review records
create table if not exists spaced_repetition (
  id bigserial primary key,
  vocab_id bigint references vocabulary_bank(id) not null,
  next_review timestamp with time zone not null,
  last_review timestamp with time zone,
  interval integer default 1,
  repetition integer default 0,
  ease_factor float default 2.5
);

-- Table: uploaded images and OCR results
create table if not exists ocr_uploads (
  id bigserial primary key,
  user_id uuid references profiles(id) not null,
  file_path text not null,
  ocr_result jsonb,
  created_at timestamp with time zone default now()
);