const form = document.getElementById('myForm');
const list = document.querySelector('.container');
const returnList = document.querySelector('.returnedBooks');

form.addEventListener('submit',submit);


async function submit(e){
    e.preventDefault();
    console.log(e.target.book.value);
    const data={
        name: e.target.book.value,
        issue_date: new Date().toLocaleString() ,
        return_date: new Date(new Date().getTime() + 60 * 60 * 1000).toLocaleString(),
        fine: 0
    }
    console.log(data);

    try{
        const res= await axios.post("http://localhost:3000/add-book",data)
        addToList(res.data);
        form.reset();
    }
    catch(err){
        console.log(err);
    }
}

function addToList(data){
    const div = document.createElement('div');
    div.id = data.id;
    div.innerHTML = `<p>Book Name: ${data.name}</p><p>Issued on: ${data.issue}</p><p>Return Date:${data.fine}</p><p>Current Fine:${calculateFine(data.return)}</p>
    <button id = "return" class = "btn btn-sm btn-light" onclick = "returnBook('${data.id}')">Return Book</button>`

    list.appendChild(div);
}

function calculateFine(returnDateString){
    const returnDate = new Date(returnDateString);

    const currentDate = new Date();
    const fineRate = 10;
    const timeDiff = Math.max(0,(currentDate - returnDate) / (1000*60*60));
    const fineAmount = fineRate*timeDiff;
    // console.log(fineAmount.toFixed(2));
    return fineAmount.toFixed(2)
}
async function returnBook(id){
    // console.log(id);
    const element = document.getElementById(id);
    // console.log(element.children[0]);
    const span = element.previousElementSibling.children[0];
    const fine = span.innerHTML;
    console.log(fine);

    try{
        const res = await axios.get(`http://localhost:3000/return-book?id=${id}&fine=${fine}`);
        showReturnedBooks(res.data);
        list.removeChild(element.parentElement);
    }
    catch(error){console.log(error)}
}
window.addEventListener('DOMContentLoaded', async () =>{
    try {
        const res = await axios.get('http://localhost:3000/get-books');
        res.data.forEach((element) => {
            if(element.returned_book){
                showReturnedBooks(element)
            }
            else addToList(element)
        })
    } catch (error) {
        console.log(error)
    }
})
function showReturnedBooks (book){
    const div = document.createElement('div');
    div.className='m-3 return';
    div.innerHTML=`<p>Book Name: ${book.name}</p>
    <p>Fine : ${book.fine}</p>
    <p>Returned on: ${book.returned_date}</p>`
    returnList.appendChild(div);
}