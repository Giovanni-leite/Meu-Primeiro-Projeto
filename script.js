const btn_add = document.getElementById('add');
const btn_add1 = document.getElementById('addd');
const form1 = document.getElementById('form1');
const box = document.getElementById('box');
const box_exp = document.getElementById('prof');
const inp_name = document.getElementById('name');
const inp_email = document.getElementById('email');
const inp_phone = document.getElementById('phone');
const inp_sex = document.getElementById('sex');
const inp_birth = document.getElementById('birth');
var graduatedi = 1;
var graduated_o = 1;


btn_add.addEventListener('click', function(e){
    e.preventDefault();
    createlabel();
    createinput();
    graduatedi++;
});

//<label for="graduated">Formação acadêmica:</label><br>
function createlabel()
{
    const elemento = document.createElement('label');
    elemento.setAttribute('for', `graduated${graduatedi}`);
    elemento.textContent = ('Formação acadêmica:');

    box.appendChild(elemento);   
}

//<input class="field" id="graduated" name="graduated" placeholder="Escreva sua formação aqui"><br>
function createinput(){

    const elemento = document.createElement('textarea');
    elemento.setAttribute('class', 'area');
    elemento.setAttribute('id', `graduated${graduatedi}`);
    elemento.setAttribute('name', 'graduated');
    elemento.setAttribute('placeholder', 'Escreva sua formação aqui');

    box.appendChild(elemento);
}

btn_add1.addEventListener('click', function(i){
    i.preventDefault();
    crtlabel();
    crtinput();
    graduated_o++;
});

//<label for="exp">Experiências profissionais:</label>
function crtlabel()
{
    const exp = document.createElement(`label`);
    exp.setAttribute(`for`, `exp${graduated_o}`);
    exp.textContent = (`Experiências profissionais`)

    box_exp.appendChild(exp)

}

//<input class="field" id="exp" name="exp" placeholder="Escreva suas experiências aqui!"><br>
function crtinput(){

    const exp = document.createElement('textarea');
    exp.setAttribute('class', 'area');
    exp.setAttribute('id', `exp${graduated_o}`);
    exp.setAttribute('name', 'exp');
    exp.setAttribute('placeholder', 'Escreva suas experiências aqui!');

    box_exp.appendChild(exp);
}

form1.addEventListener('submit', function (event){
    event.preventDefault();
    const fullname = inp_name.value;
    const email = inp_email.value;
    const phone = inp_phone.value;
    const sex = inp_sex.value;
    const birth = inp_birth.value;
    let graduated = [];
    let graduated_o_array = [];

    for(i = 0; i<graduatedi; i++){
        let inp_graduated = document.getElementById(`graduated${i}`);
        graduated[i] = inp_graduated.value;
    }

    for(i = 0; i<graduated_o; i++){
        let inp_graduated_u = document.getElementById(`exp${i}`);
        graduated_o_array[i] = inp_graduated_u.value;
    }

    const data = {
        fullname,
        email,
        phone,
        sex,
        birth,
        graduated,
        graduated_o_array
    };

    fetch('gerar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'formulario.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erro:', error));
});