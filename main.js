// ======================================================
// MAIN.JS
// Sistema completo da ONG
// Compatível com VS Code + Live Server
// ======================================================


// ======================================================
// 1. STORAGE
// ======================================================

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function recuperarDados(chave) {
    const dados = localStorage.getItem(chave);

    if (dados) {
        return JSON.parse(dados);
    }

    return null;
}

function removerDados(chave) {
    localStorage.removeItem(chave);
}


// ======================================================
// 2. FORMULÁRIO
// ======================================================

function iniciarFormulario() {

    const form = document.getElementById("formCadastro");

    if (!form) {
        return;
    }

    // Evita adicionar eventos repetidos
    if (form.dataset.iniciado === "true") {
        return;
    }

    form.dataset.iniciado = "true";

    carregarDados(form);


    // Validação enquanto digita
    form.addEventListener("input", function (event) {

        validarCampo(event.target);

    });


    // Envio do formulário
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const campos = form.querySelectorAll(
            "input, select"
        );

        let formularioValido = true;


        campos.forEach(function (campo) {

            if (!validarCampo(campo)) {

                formularioValido = false;

            }

        });


        if (!formularioValido) {

            mostrarMensagem(
                form,
                "Preencha os campos corretamente.",
                "erro"
            );

            return;
        }


        const dados = {

            nome: form.nome.value.trim(),

            email: form.email.value.trim(),

            telefone: form.telefone.value.trim(),

            cpf: form.cpf.value.trim(),

            cep: form.cep.value.trim()

        };


        salvarDados(
            "dadosUsuario",
            dados
        );


        mostrarMensagem(
            form,
            "Cadastro realizado com sucesso!",
            "sucesso"
        );

    });
}


// ======================================================
// VALIDAÇÃO DOS CAMPOS
// ======================================================

function validarCampo(campo) {

    if (!campo) {
        return true;
    }


    if (campo.value.trim() === "") {

        campo.classList.add("erro");

        return false;
    }


    if (!campo.checkValidity()) {

        campo.classList.add("erro");

        return false;
    }


    campo.classList.remove("erro");

    return true;
}


// ======================================================
// MENSAGEM DO FORMULÁRIO
// ======================================================

function mostrarMensagem(
    form,
    texto,
    tipo
) {

    let mensagem =
        form.querySelector(
            ".mensagem-form"
        );


    if (!mensagem) {

        mensagem =
            document.createElement("p");

        mensagem.classList.add(
            "mensagem-form"
        );

        form.appendChild(
            mensagem
        );
    }


    mensagem.textContent = texto;

    mensagem.className =
        `mensagem-form ${tipo}`;
}


// ======================================================
// CARREGAR DADOS SALVOS
// ======================================================

function carregarDados(form) {

    const dados =
        recuperarDados(
            "dadosUsuario"
        );


    if (!dados) {
        return;
    }


    if (form.nome) {

        form.nome.value =
            dados.nome || "";

    }


    if (form.email) {

        form.email.value =
            dados.email || "";

    }


    if (form.telefone) {

        form.telefone.value =
            dados.telefone || "";

    }


    if (form.cpf) {

        form.cpf.value =
            dados.cpf || "";

    }


    if (form.cep) {

        form.cep.value =
            dados.cep || "";

    }

}


// ======================================================
// 3. MENU
// ======================================================

function iniciarMenu() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const menu =
        document.getElementById(
            "menu"
        );


    if (!menuToggle || !menu) {
        return;
    }


    // Evita duplicar eventos
    if (
        menuToggle.dataset.iniciado ===
        "true"
    ) {
        return;
    }


    menuToggle.dataset.iniciado =
        "true";


    // Abrir / fechar menu
    menuToggle.addEventListener(
        "click",
        function () {

            menu.classList.toggle(
                "active"
            );


            const aberto =
                menu.classList.contains(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto
            );

        }
    );


    // Fechar menu ao clicar em um link
    const links =
        menu.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    menu.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


// ======================================================
// 4. ROTAS
// ======================================================

const rotas = {

    "/projetos": `

        <section class="pagina">

            <h1>
                Nossos Projetos
            </h1>

            <p>
                Conheça algumas das ações
                sociais realizadas pela
                nossa organização.
            </p>


            <article class="card">

                <h2>
                    Campanha de Doação
                </h2>

                <p>
                    Arrecadação de alimentos
                    para famílias da comunidade.
                </p>

            </article>


            <article class="card">

                <h2>
                    Programa de Voluntariado
                </h2>

                <p>
                    Participe das ações sociais
                    realizadas pela organização.
                </p>

            </article>

        </section>

    `,


    "/cadastro": `

        <section class="pagina">

            <h1>
                Cadastro
            </h1>

            <p>
                Preencha seus dados para
                participar das ações da ONG.
            </p>


            <form id="formCadastro">

                <label for="nome">
                    Nome completo:
                </label>

                <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                >


                <label for="email">
                    E-mail:
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                >


                <label for="telefone">
                    Telefone:
                </label>

                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    required
                >


                <label for="cpf">
                    CPF:
                </label>

                <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                    placeholder="000.000.000-00"
                    required
                >


                <label for="cep">
                    CEP:
                </label>

                <input
                    type="text"
                    id="cep"
                    name="cep"
                    pattern="[0-9]{5}-[0-9]{3}"
                    placeholder="00000-000"
                    required
                >


                <button type="submit">
                    Cadastrar
                </button>

            </form>

        </section>

    `
};


// ======================================================
// 5. CONTEÚDO ORIGINAL DA HOME
// ======================================================

let conteudoInicial = "";


// ======================================================
// 6. IDENTIFICAR A PASTA DO PROJETO
// ======================================================

// Isso permite funcionar no Live Server,
// mesmo se o projeto estiver dentro de uma pasta.

const BASE_PATH =
    new URL(
        ".",
        window.location.href
    ).pathname;


// ======================================================
// 7. DESCOBRIR A ROTA ATUAL
// ======================================================

function obterRotaAtual() {

    let caminho =
        window.location.pathname;


    // Remove a pasta do projeto
    if (
        caminho.startsWith(
            BASE_PATH
        )
    ) {

        caminho =
            caminho.substring(
                BASE_PATH.length - 1
            );

    }


    // Remove "/" do final
    if (
        caminho !== "/" &&
        caminho.endsWith("/")
    ) {

        caminho =
            caminho.slice(0, -1);

    }


    // index.html = página inicial
    if (
        caminho === "/index.html" ||
        caminho === ""
    ) {

        return "/";

    }


    return caminho;

}


// ======================================================
// 8. CRIAR URL DA ROTA
// ======================================================

function criarUrlRota(rota) {

    if (rota === "/") {

        return BASE_PATH;

    }


    return (
        BASE_PATH +
        rota.substring(1)
    );

}


// ======================================================
// 9. RENDERIZAR ROTA
// ======================================================

function renderizarRota() {

    const app =
        document.getElementById(
            "app"
        );


    if (!app) {
        return;
    }


    const caminho =
        obterRotaAtual();


    // ==================================================
    // PÁGINA INICIAL
    // ==================================================

    if (caminho === "/") {

        app.innerHTML =
            conteudoInicial;

    }


    // ==================================================
    // OUTRAS PÁGINAS
    // ==================================================

    else {

        app.innerHTML =
            rotas[caminho] ||
            `

                <section class="pagina">

                    <h1>
                        Página não encontrada
                    </h1>

                    <p>
                        A página que você
                        tentou acessar
                        não existe.
                    </p>

                </section>

            `;

    }


    // Informa que a SPA terminou
    // de renderizar uma página
    document.dispatchEvent(
        new CustomEvent(
            "spa:renderizada"
        )
    );

}


// ======================================================
// 10. NAVEGAÇÃO SPA
// ======================================================

function iniciarSPA() {

    const app =
        document.getElementById(
            "app"
        );


    if (!app) {
        return;
    }


    // Guarda o HTML original
    // da página inicial
    conteudoInicial =
        app.innerHTML;


    // ==================================================
    // CLIQUES NOS LINKS
    // ==================================================

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    "a"
                );


            if (!link) {
                return;
            }


            const destino =
                link.getAttribute(
                    "href"
                );


            if (!destino) {
                return;
            }


            // Links externos
            if (
                destino.startsWith(
                    "http://"
                ) ||
                destino.startsWith(
                    "https://"
                ) ||
                destino.startsWith(
                    "mailto:"
                ) ||
                destino.startsWith(
                    "tel:"
                )
            ) {

                return;

            }


            // Âncoras
            if (
                destino.startsWith("#")
            ) {

                return;

            }


            // ==================================================
            // ROTAS INTERNAS
            // ==================================================

            let rota = destino;


            // Aceita links como:
            // /
            // /index.html
            // /projetos
            // /cadastro

            if (
                rota ===
                "/index.html"
            ) {

                rota = "/";

            }


            // Só trata as rotas da nossa SPA
            if (
                rota !== "/" &&
                rota !== "/projetos" &&
                rota !== "/cadastro"
            ) {

                return;

            }


            // Impede recarregamento
            event.preventDefault();


            // Fecha menu mobile
            const menu =
                document.getElementById(
                    "menu"
                );


            const menuToggle =
                document.getElementById(
                    "menuToggle"
                );


            if (menu) {

                menu.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            // Cria URL correta
            const novaUrl =
                criarUrlRota(
                    rota
                );


            // Atualiza URL
            history.pushState(
                {},
                "",
                novaUrl
            );


            // Mostra página
            renderizarRota();

        }
    );


    // ==================================================
    // BOTÃO VOLTAR / AVANÇAR
    // ==================================================

    window.addEventListener(
        "popstate",
        function () {

            renderizarRota();

        }
    );


    // ==================================================
    // PRIMEIRA ABERTURA
    // ==================================================

    const rotaInicial =
        obterRotaAtual();


    // Só renderiza rotas diferentes
    // da Home
    if (
        rotaInicial !== "/"
    ) {

        renderizarRota();

    }

}


// ======================================================
// 11. INICIALIZAÇÃO
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarMenu();

        iniciarSPA();

        iniciarFormulario();

    }
);


// ======================================================
// 12. REATIVAR FORMULÁRIO
// ======================================================

document.addEventListener(
    "spa:renderizada",
    function () {

        iniciarFormulario();

    }
);