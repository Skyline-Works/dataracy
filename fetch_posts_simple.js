
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://snbyvutgwabdtlgyaknt.supabase.co';
const supabaseKey = 'sb_publishable_c3ZodikErKpe9B5CAr-HhQ_6ah1Xyke';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) { console.error(error); return; }

    data.forEach(post => {
        console.log(`ID: ${post.id} | Title: ${post.title}`);
    });
}

fetchPosts();
