# Meu Portfólio <!-- omit in toc -->

> Portfólio pessoal e profissional desenvolvido com HTML, CSS e JavaScript.

[![License](https://badgen.net/github/license/RobertoAraujo/RobertoAraujo.github.io)](LICENSE)

## Tabela de Conteúdos <!-- omit in toc -->

* [Sobre o Projeto](#sobre-o-projeto)
  * [Construído Com](#construído-com)
  * [Funcionalidades](#funcionalidades)
* [Como Começar](#como-começar)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Uso](#uso)
  * [Personalização](#personalização)
* [Contribuindo](#contribuindo)
* [Licença](#licença)

## Sobre o Projeto

![Preview do Portfólio](assets/images/preview.png)

Este é um portfólio pessoal desenvolvido com HTML, CSS e JavaScript, hospedado no Github Pages. O site é responsivo e otimizado para dispositivos móveis, sendo um ótimo lugar para apresentar projetos, habilidades e experiência profissional.

### Construído Com

* [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
* [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### Funcionalidades

* Design Responsivo Mobile-First
* Duas páginas principais (Início e Portfólio)
* Estilos modernos e limpos
* Fácil personalização
* Hospedado gratuitamente no Github Pages

## Como Começar

Para obter uma cópia local em funcionamento, siga os passos abaixo.

### Pré-requisitos

* Um editor de texto (VSCode, Sublime Text, etc.)
* Git instalado
* Navegador web moderno

### Instalação

1. Clone o repositório

```sh
git clone https://github.com/RobertoAraujo/RobertoAraujo.github.io.git
```

2. Navegue até a pasta do projeto

```sh
cd RobertoAraujo.github.io
```

3. Abra o arquivo `index.html` no seu navegador ou use um servidor local

```sh
# Usando Python 3
python -m http.server 8000

# Usando Node.js com http-server
npx http-server
```

4. Acesse `http://localhost:8000` no seu navegador

## Uso

### Estrutura do Projeto

```
.
├── index.html           # Página inicial
├── portfolio.html       # Página do portfólio
├── assets/              # Imagens e recursos
├── css/
│   └── styles.css      # Estilos globais
└── js/
    └── script.js       # Scripts JavaScript
```

### Personalização

#### Editando HTML

* **index.html** - Personalize seu nome, bio e informações de contato
* **portfolio.html** - Adicione seus projetos e trabalhos

#### Editando CSS

Modifique o arquivo [css/styles.css](css/styles.css) para:
* Alterar cores e fonte
* Ajustar layout e espaçamento
* Customizar animações

#### Editando JavaScript

Modifique o arquivo [js/script.js](js/script.js) para:
* Adicionar funcionalidades interativas
* Implementar formulários
* Integrar APIs externas

#### Adicionando Imagens

Coloque suas imagens na pasta `assets/` e referencie no HTML:

```html
<img src="assets/sua-imagem.jpg" alt="Descrição">
```

## Contribuindo

Contribuições são bem-vindas! Se você deseja melhorar este projeto:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add some MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Pronto para começar?** Edite os arquivos HTML com suas informações e hospede gratuitamente no Github Pages!
