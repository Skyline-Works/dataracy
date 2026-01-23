
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://snbyvutgwabdtlgyaknt.supabase.co';
const supabaseKey = 'sb_publishable_c3ZodikErKpe9B5CAr-HhQ_6ah1Xyke';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('id, title, type, tags, excerpt')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(JSON.stringify(data, null, 2));
}

fetchPosts();
