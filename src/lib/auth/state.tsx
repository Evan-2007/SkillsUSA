import cookies from 'js-cookie'



export default async function State(params) {   
    cookies.get('session_token')
    if (cookies.get('session_token') == undefined) {
        router.push('/admin')
    }else{
        

    }

}