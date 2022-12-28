// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';



//#region ------ Event Listener--------
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', postTodos);
document.getElementById('update').addEventListener('click', putTodos);
document.getElementById('delete').addEventListener('click', removeTodos);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

// #endregion ------ Event Listener--------

function getTodos(){
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params:{
    //         _limit: 5
    //     }
    // })
    // .then(res=> showOutput(res))
    // .catch(err => console.error(err));
    // {timeout: 5}
    axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5' )
    .then(res => showOutput(res))
    .catch(error => console.error(error))
}

function postTodos(){
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data:{
    //         title: "New Todo",
    //         completed: false
    //     }
    // })
    axios
        .post('https://jsonplaceholder.typicode.com/todos',{
        title: "New Todo",
        completed: true
    })
    .then(res=> showOutput(res))
    .catch(err => console.error(err));
}


function putTodos(){
    // axios
    //     .put('https://jsonplaceholder.typicode.com/todos/1',{
    //         title: "Update Todo",
    //         completed: false
    //     })
    //     .then(res => showOutput(res))
    //     .catch(err => console.error(err))

    axios
    .patch('https://jsonplaceholder.typicode.com/todos/2',{
        title: "Update Todo",
        completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

function removeTodos(){
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res =>showOutput(res))
    .catch(err => console.error(err))
}

// Simultaneous Data
function getData(){
    // axios
    // .all([
    //     axios.get('https://jsonplaceholder.typicode.com/todos'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    // ])
    // .then(res =>{
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);})
    // .catch(err => console.error(err))

    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts)=>{showOutput(posts)}))
    .catch(err => console.error(err))
}


// Custom Headers

function customHeaders(){
    const config ={
        headers:{
            'Content-Type': 'application/json',
            Authorization :'sometoken'
        }
    };

    axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            title : "New Todo",
            completed: true
        },
        config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}


// Intercepting Requests & Responses

axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().toLocaleString()}`
        );

        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);


// Transforming Requests and Responses

function transformResponse(){
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data:{
            title:'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };

    axios(options).then(res => showOutput(res)).catch(err=> console.error(err));
}


// Error Handling 
 function errorHandling(){
    axios
    .get('https://jsonplaceholder.typicode.com/errorpage')
    .then(res=>showOutput(res))
    .catch(err=>{
        if(err.response){
            //Sercer responsed with a status other 200 range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if(err.response.status === 404){
                alert('Page Not Found.');
            }
            else if(err.request){
                // Resquest was made but no response
                console.error(err.request);
            } else {
                console.error(err.message);
            }
            
        }
    })
 }

// Error VALIDATING
// function errorHandling(){
//     axios
//     .get('https://jsonplaceholder.typicode.com/errorpage',{
//         validateStatus: function(status){
//             return status < 500; //Reject only if status is greater or equal to 500
//         }
//     })
//     .then(res=>showOutput(res))
//     .catch(err=>{
//         if(err.response){
//             //Sercer responsed with a status other 200 range
//             console.log(err.response.data);
//             console.log(err.response.status);
//             console.log(err.response.headers);

//             if(err.response.status === 404){
//                 alert('Page Not Found.');
//             }
//             else if(err.request){
//                 // Resquest was made but no response
//                 console.error(err.request);
//             } else {
//                 console.error(err.message);
//             }
            
//         }
//     })
//  }

// Cancel Token

function cancelToken(){

    const source = axios.CancelToken.source();
    
    axios.get('https://placeholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch( thrown =>{
        if(axios.isCancel(thrown)){
            console.log('Cancelled manually.', thrown.message);
        }
    });

    if (true){
        source.cancel('Request Cancelled !!');
    }
}


// AXIOS INSTANCE
// const axiosInstance = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com'
// });

// axiosInstance.get('/comments?_limit=5').then(res => showOutput(res));


// Showing ouput in browser
function showOutput(res){
    console.log(res);
    document.getElementById('res').innerHTML=
    `
    <div class="output">
        <h2>Status: ${res.status}</h2>
    </div>

    <div class="output">
        <div class="output-header">
            Headers
        </div>
        <div class="output-body">
            <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
    </div>

    <div class="output">
        <div class="output-header">
            Data
        </div>
        <div class="output-body">
            <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
    </div>

    <div class="output">
        <div class="output-header">
            Config
        </div>
        <div class="output-body">
            <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
    </div>
    `
}