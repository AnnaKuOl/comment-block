const form = document.querySelector('.form');
const input = form.querySelector('.form__name');
const textarea = form.querySelector('.form__text');
const date = form.querySelector('.form__date');
const errorName = form.querySelector('.error__name');
const errorText = form.querySelector('.error__text');
const commentsContainer = document.querySelector('.comments');


const comments = [];
const comment = {};

class Comment {
    constructor(data={}, selectorTemplate ) {
        this._data = data;
        this._selectorTemplate = selectorTemplate;
    }
    
    _getTempate(){ 
        const temp = document.querySelector(this._selectorTemplate).content.querySelector('.comments__item')
        console.log(temp);
        return temp;
    }

    getElement() {
        this.element = this._getTempate().cloneNode(true); 
        const commentName = this.element.querySelector('.comment__name');
        const commentText = this.element.querySelector('.comment__text');
        const commentDate = this.element.querySelector('.comment__time');
        this.buttonLiked = this.element.querySelector('.like');
        this.buttonDeleted = this.element.querySelector('.trash');
        commentName.textContent = this._data.name;
        commentText.textContent = this._data.text;
        commentDate.textContent = formateDate( this._data.time);
        this.setEventListener();
        return this.element;
    }
    setEventListener() {
        this.buttonDeleted.addEventListener("click", () =>
            this.element.remove()
        );
        this.buttonLiked.addEventListener('click', () => {
            this.buttonLiked.classList.toggle('active');
        });
    }
}
function clearForm(){
    input.value="";
    textarea.value="";
    date.value = "";
}
function formateDate(date){
    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
        ].map(el => el.slice(-2))
    let day = date.getDate();
    let today = new Date();
    let todayTime = [
                    '0' + today.getHours(),
                    '0' + today.getMinutes()
                    ].map(el => el.slice(-2))
    let diffDay = today.getDate() - day;
    if(diffDay < 1){
        return `сегодня, ${todayTime.join(":")}`
    }else if (diffDay < 2) {
        return `вчера, ${d.slice(3).join(":")}`
    }
    else{
        return `${d.slice(0, 3).join(".")} ${d.slice(3).join(":")}`
    }
}
function handlerForm(event){
        event.preventDefault();
        if(input.classList.contains('invalid') && textarea.classList.contains('invalid')){
            return;
        }
        comment.name = input.value;
        comment.text = textarea.value;
        comment.date = new Date(date.value.split('-').join(", "));
        comment.time = date.value ? comment.date : new Date();
        comments.push(comment);
        createComment(comment);
        clearForm();


}
input.onblur = function() {
    if (input.value.length < 2) {
        input.classList.add('invalid');
        errorName.innerHTML = 'Имя должно состоять, минимум из 2-х символов';
    }
};
input.onfocus = function() {
    if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');
        errorName.innerHTML = "";
    }
};
textarea.onblur = function() {
    if (textarea.value.length < 4) {
        textarea.classList.add('invalid');
        errorText.innerHTML = 'Комментарий должен состоять, минимум из 4-х символов';
    }
};
textarea.onfocus = function() {
    if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');
        errorText.innerHTML = "";
    }
};
form.addEventListener('submit', handlerForm);
//доделать лайк и удаление
const trash = document.querySelector('.trash');
trash?.addEventListener('click', () => {
    newCommentElement.remove();
})
const like = document.querySelector('.like');
like?.addEventListener('click', function(event){
    event.target.classList.toggle('active')
})
function createComment(dataComment) {
    const commentInstance = new Comment(dataComment, "#comment-template");
    const newCommentElement = commentInstance.getElement();
    commentsContainer.append(newCommentElement);

}
