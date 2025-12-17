        const authors = [
  {
    name: "Leandro Ramos da Silva",
    photo: "https://wwws.cnpq.br/cvlattesweb/pkg_util_img.show_foto?v_cod=K1129846D0",
      Coord: "Coordenação Administrativa"
    bio: "Graduando em Pedagogia, 5° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "https://lattes.cnpq.br/7294248395472927",
    uffmail: "Leandroramossilva@id.uff.br"
  },
  {
    name: "Paula Enaely de Marins Oliveira",
    photo: "",
        Coord: "Coordenação de Infraestrutura"
    bio: "Graduanda em Pedagogia, 8° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "p_enaely@id.uff.br"
  },
  {
    name: "Tabata da Silva do Carmo",
    photo: "",
    Coord: "Coordenação Cultural"
    bio: "Graduanda em Pedagogia, 2° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Tabatacarmo@id.uff.br"
  },
  {
  name: "Vivian dos Santos de Assis",
    photo: "",
    Coord: "Coordenação de Comunicação"
    bio: "Graduanda em Pedagogia, 7° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "V_assis@id.uff.br"
  }
  {
   name: "Louize dos Santos de Lima Rodrigues",
    photo: "",
    Coord: "Coordenação Política"
    bio: "Graduanda em Pedagogia, 4° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Louizesantos@id.uff.br"
  },
  {
    name: "Pablo Quezado",
    photo: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1197212A3",
    coord: "Coordenação Acadêmica"
    bio: "Graduando em Pedagogia, 7° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "http://lattes.cnpq.br/3986415920870527",
    uffmail: "Pabloquezado@id.uff.br"
  },
  {
   name: "Vanessa da Silva Valencio",
    photo: "",
    Coord: "Coordenação de Pós-Graduação"
    bio: "Graduanda em Pedagogia, 4° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Vanessav@id.uff.br"
  },
  {
   name: "Wendel Fabiano Alfredo",
    photo: "",
    Coord: "1° Suplente"
    bio: "Graduando em Pedagogia, 2° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Wendelfabiano@id.uff.br"
  },
  {
     name: "Guilherme Lacerda do Valle",
    photo: "",
    Coord: "2° Suplência"
    bio: "Graduando em Pedagogia, 2° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Lacerdaguilherme@id.uff.br"
  },
  {
    name: "Isabel de Abreu Ceia",
    photo: "",
    Coord: "3° Suplência"
    bio: "Graduanda em Pedagogia, 5° Período pelo Instituto de Educação de Angra dos Reis da Universidade Federal Fluminense (IEAR-UFF).",
    lattes: "",
    uffmail: "Isaceia@id.uff.br"
  }
];

const container = document.getElementById("contact-posts");

authors.forEach(author => {
  const authorCard = document.createElement("article");
  authorCard.classList.add("post", "author-card");

  authorCard.innerHTML = `
    <img src="${author.photo}" alt="${author.name}" class="author-photo">
    <h2>${author.name}</h2>
    <p class="author-bio">${author.bio}</p>
    <p>
      <a href="${author.lattes}" target="_blank">Currículo Lattes</a> |
      <a href="mailto:${author.uffmail}">${author.uffmail}</a>
    </p>
  `;

  container.appendChild(authorCard);
});
