import { createClient } from '@supabase/supabase-js';
import environmentVariables from '../../config/global/environmentVariables';

const supabaseUrl = environmentVariables.SUPABASE_URL as string;
const supabaseKey = environmentVariables.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string | null> => {
    try {
        //remove spaces and special characters from file name
        const newFileName = fileName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
        const { data, error } = await supabase.storage
            .from('test-23-01')
            .upload(`public/${newFileName}`, fileBuffer, {
                contentType: mimeType, // O el tipo que recibas
                upsert: true
            })

        if (error) throw error

        const { data: publicUrlData } = supabase.storage
            .from('test-23-01')
            .getPublicUrl(`public/${newFileName}`)

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error("Error uploading image to Supabase:", error);
        return null;
    }

}

export default uploadImage;