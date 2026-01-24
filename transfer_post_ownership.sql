-- 1. Get IDs for transfer (Declarative)
DO $$
DECLARE
    target_author_id UUID;
    old_author_id UUID;
BEGIN
    -- Get the Target Author ID (skylineworks.official@gmail.com)
    SELECT id INTO target_author_id
    FROM public.profiles
    WHERE email = 'skylineworks.official@gmail.com'
    LIMIT 1;

    -- Get the Old Author ID (hello@dataracy.com)
    -- If you want to move ALL posts from specific user
    SELECT id INTO old_author_id
    FROM public.profiles
    WHERE email = 'hello@dataracy.com'
    LIMIT 1;

    -- Update Logic
    IF target_author_id IS NOT NULL AND old_author_id IS NOT NULL THEN
        -- Move all posts from old user to new user
        UPDATE public.posts
        SET author_id = target_author_id
        WHERE author_id = old_author_id;

        RAISE NOTICE 'Successfully moved posts from % to %', old_author_id, target_author_id;
    ELSE
        RAISE NOTICE 'Could not find one of the users. Target: %, Old: %', target_author_id, old_author_id;
    END IF;
END $$;
