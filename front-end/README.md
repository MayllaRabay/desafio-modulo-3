## Front-end

Telas que precisam ser desenvolvidas:

## Áreas não protegidas

### Cadastro de usuário: `/cadastro` (Obrigatório)
- Funcionalidades obrigatórias:
    - Validar a igualdade das senhas
    - Validar os campos obrigatórios (consultar nos requisitos do back-end)
    - Enviar os dados do formulário para a rota `POST /usuarios`
    - Redirecionar para a rota de login (`/`);
    - Inputs:
        - nome
        - nome_loja
        - email
        - senha
        - senhaConfirmacao
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)
        
<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-hook-form</code></li>
    <li><code>react-router-dom</code></li>
    <li><code>fetch</code></li>
    <li>
        componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

<hr />

### Login: `/`(Obrigatório)
- Funcionalidades obrigatórias:
    - Validar os campos obrigatórios (consultar nos requisitos do back-end)
    - Enviar os dados do formulário para a rota `POST /login`
    - Salvar o `token` em um *contexto*
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - email
        - senha
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>react-hook-form</code></li>
    <li><code>react-router-dom</code></li>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li>
        componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

<hr />

## Áreas protegidas

### Produtos: `/produtos`(Extra)
- Funcionalidades obrigatórias:
    - Carregamento dos produtos da loja (`GET /produtos`)
    - Ao clicar no card do produto, redirecionar para a rota de (`/produto/:id/editar`)
    - Ao clicar no icone de lixo no card do produto, abrir um modal e se o cliente confirmar, deletar o produto (`DELETE /produtos/:id`)
    - Ao clicar no botão de "ADICIONAR PRODUTO", redirecionar para a rota de (`/produtos/novo`) 
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code>, <code>Grid</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

<hr />

### Editar Produtos: `/produtos/:id/editar`(Extra)
- Funcionalidades obrigatórias:
    - Como a atualização dos dados do produto pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do produto nesta tela e nem verificar os dados obrigatórios.
    - Enviar os dados do formulário para a rota `PUT /produtos/:id`
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - nome 
        - preco
        - estoque
        - descricao
        - imagem (link para uma imagem)
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

<hr />

### Adicionar Produtos: `/produtos/novo`(Extra)
- Funcionalidades obrigatórias:
    - Enviar os dados do formulário para a rota `POST /produtos`
    - Redirecionar para a rota de produtos (`/produtos`);
    - Inputs:
        - nome 
        - preco
        - estoque
        - descricao
        - imagem (link para uma imagem)
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

<hr />

### Perfil de usuário: `/perfil`(Extra)
- Funcionalidades obrigatórias:
    - Visualização dos dados do perfil.
    - Redirecionar para a rota de perfil (`/perfil/editar`);
    - Inputs (não precisamos controlá-los):
        - nome 
        - nome_loja
        - email
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    </ul>
</details>

<hr />

### Edição de usuário: `/perfil/editar`(Extra)
- Funcionalidades obrigatórias:
    - Como a atualização dos dados do perfil pode ser parcial (somente um campo por ex), não é obrigatório carregar os dados do usuário nesta tela e nem verificar os dados obrigatórios.
    - Se a senha for informada, validar a igualdade das senhas
    - Enviar os dados do formulário para a rota `PUT /perfil`
    - Redirecionar para a rota de perfil (`/perfil`);
    - Inputs:
        - nome 
        - nome_loja
        - email
        - senha
        - senhaConfirmacao
- Funcionalidades extras: 
    - Controle de estado de requisições (erro e carregamento)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>fetch</code></li>
    <li><code>react-hook-form</code></li>
    <li><code>context</code></li>
    <li><code>react-router-dom</code></li>
    <li>
    componentes <code>TextField</code>,             <code>Backdrop</code>, <code>CircularProgress</code>, <code>Snackbar</code>code>, <code>Alert</code> e <code>Button</code> do Material UI
    </li>
    <li><img src="https://i.imgur.com/OAxmxYB.png"></li>
    </ul>
</details>

<hr />

## Componentes

### Navbar
- Funcionalidades obrigatórias:
    - Redirecionar o usuário para as rotas `/produtos` e `/perfil`
    - Deslogar (remover o token do *contexto*)

<details>
    <summary>Dicas</summary>
    <ul>
    <li><code>material-icons</code></li>
    <li><code>react-router-dom</code></li>
    <li>Usar o componente <code>NavLink</code> do react-router-dom para conseguir renderizar os icones ativos</li>
    </ul>
</details>

<hr />

## Requisitos obrigatórios
- Sua aplicação deve ser desenvolvida com `React`;
- Trabalhar com `Hooks` (`useState`, `useEffect`, `useRef`...)
- Trabalhar com `componentização`;
- Utilizar `context API` (Context);
- Utilizar roteamento (`react-router-dom`);
- Utilizar Material UI para criação das telas;
- As requisições devem ser feitas utilizando `fetch`;
- Integração ao back-end (sua API ou [https://desafio-m03.herokuapp.com](https://desafio-m03.herokuapp.com));
- Seguir a estrutura de layout do wireframe que está no arquivo `.fig` que se encontra na pasta raiz do desafio;


## Links Úteis
- Documentação do ReactJS: https://reactjs.org/
    - Context API: https://reactjs.org/docs/context.html
    - Hooks (useState, useEffect, useRef): https://reactjs.org/docs/hooks-intro.html
- Documentação react-router-dom: https://reactrouter.com/web/guides/quick-start
- Documentação react-hook-form: https://react-hook-form.com/
- Documentação Material UI: https://material-ui.com/
- Documentação Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch