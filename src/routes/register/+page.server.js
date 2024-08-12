import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({ request, locals }) => {

        const formData = Object.fromEntries(await request.formData());
        formData.username = formData.email.split('@')[0];
        
        let createResult = false;
        
        let registerResponse = {
            error: false,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            message: ''
        }
                
        try {
            //create the user
            const result = await locals.pb.collection('users').create(formData);
            if (result) createResult = true;
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            registerResponse.error = true;
            registerResponse.message = err.message;
        } 
        
        if (createResult) {
            throw redirect(303, '/login?registered=true');
        } else {
            return registerResponse;
        }
    }
}