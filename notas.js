
        // ==========================================
        // ARRAY DOS ALUNOS
        // ==========================================

        let alunos = [];


        // ==========================================
        // ADICIONAR ALUNO
        // ==========================================

        function adicionarAluno() {


            let nome = document
                .getElementById("nome")
                .value
                .trim();


            let campoNota =
                document.getElementById("nota");


            let nota = Number(campoNota.value);


            // Verificar nome

            if (nome === "") {

                alert("Digite o nome do aluno.");

                return;

            }


            // Verificar nota

            if (

                campoNota.value === "" ||

                nota < 0 ||

                nota > 100

            ) {

                alert("Digite uma nota entre 0 e 100.");

                return;

            }


            // ==========================================
            // REGRA DE TRÊS
            // ==========================================
            //
            // 100 -------- 60
            // nota ------- X
            //
            // X = nota * 60 / 100
            //
            // Math.round() arredonda o resultado.
            //
            // Exemplo:
            //
            // 46 → 27,6 → 28
            // ==========================================

            let resultado = Math.round(

                (nota * 60) / 100

            );


            // Criar objeto

            let aluno = {

                nome: nome,

                nota: nota,

                resultado: resultado

            };


            // Adicionar ao array

            alunos.push(aluno);


            // Atualizar tela

            mostrarAlunos();


            // Limpar campos

            document.getElementById("nome").value = "";

            campoNota.value = "";


            // Voltar para o campo nome

            document.getElementById("nome").focus();

        }


        // ==========================================
        // MOSTRAR ALUNOS
        // ==========================================

        function mostrarAlunos() {


            let tabela =
                document.getElementById("tabelaAlunos");


            tabela.innerHTML = "";


            // Se não houver alunos

            if (alunos.length === 0) {


                tabela.innerHTML = `

                    <tr>

                        <td

                            colspan="4"

                            class="vazio"

                        >

                            Nenhum aluno adicionado.

                        </td>

                    </tr>

                `;


                atualizarResumo();

                return;

            }


            // Percorrer alunos

            alunos.forEach(function(aluno, indice) {


                let linha =
                    document.createElement("tr");


                linha.innerHTML = `

                    <td>

                        ${aluno.nome}

                    </td>


                    <td>

                        ${aluno.nota}

                    </td>


                    <td class="resultado">

                        ${aluno.resultado}

                    </td>


                    <td>

                        <button

                            class="btn-excluir"

                            onclick="excluirAluno(${indice})"

                        >

                            Excluir

                        </button>

                    </td>

                `;


                tabela.appendChild(linha);

            });


            atualizarResumo();

        }


        // ==========================================
        // ORDENAR A → Z
        // ==========================================

        function ordenarAZ() {


            alunos.sort(function(a, b) {


                return a.nome.localeCompare(

                    b.nome,

                    'pt-BR',

                    {

                        sensitivity: 'base'

                    }

                );

            });


            mostrarAlunos();

        }


        // ==========================================
        // ORDENAR Z → A
        // ==========================================

        function ordenarZA() {


            alunos.sort(function(a, b) {


                return b.nome.localeCompare(

                    a.nome,

                    'pt-BR',

                    {

                        sensitivity: 'base'

                    }

                );

            });


            mostrarAlunos();

        }


        // ==========================================
        // EXCLUIR ALUNO
        // ==========================================

        function excluirAluno(indice) {


            alunos.splice(indice, 1);


            mostrarAlunos();

        }


        // ==========================================
        // ATUALIZAR RESUMO
        // ==========================================

        function atualizarResumo() {


            let quantidade = alunos.length;


            document.getElementById("quantidade").innerText =

                quantidade;


            // Não existem alunos

            if (quantidade === 0) {


                document.getElementById("media").innerText = "0";

                document.getElementById("maior").innerText = "0";

                document.getElementById("menor").innerText = "0";

                document.getElementById("alunoMaior").innerText = "-";

                document.getElementById("alunoMenor").innerText = "-";


                return;

            }


            // ==========================================
            // MÉDIA
            // ==========================================

            let soma = 0;


            alunos.forEach(function(aluno) {


                soma += aluno.resultado;

            });


            let media = soma / quantidade;


            document.getElementById("media").innerText =

                media.toFixed(2);


            // ==========================================
            // MAIOR NOTA
            // ==========================================

            let alunoMaior = alunos[0];


            alunos.forEach(function(aluno) {


                if (

                    aluno.resultado >

                    alunoMaior.resultado

                ) {

                    alunoMaior = aluno;

                }

            });


            document.getElementById("maior").innerText =

                alunoMaior.resultado;


            document.getElementById("alunoMaior").innerText =

                alunoMaior.nome;


            // ==========================================
            // MENOR NOTA
            // ==========================================

            let alunoMenor = alunos[0];


            alunos.forEach(function(aluno) {


                if (

                    aluno.resultado <

                    alunoMenor.resultado

                ) {

                    alunoMenor = aluno;

                }

            });


            document.getElementById("menor").innerText =

                alunoMenor.resultado;


            document.getElementById("alunoMenor").innerText =

                alunoMenor.nome;

        }


        // ==========================================
        // BAIXAR EXCEL
        // ==========================================

        function baixarExcel() {


            // Verificar se existem alunos

            if (alunos.length === 0) {

                alert(

                    "Adicione pelo menos um aluno antes de baixar a tabela."

                );

                return;

            }


            // ==========================================
            // CRIAR DADOS DA TABELA
            // ==========================================

            let dados = [];


            // Cabeçalho

            dados.push([

                "Aluno",

                "Nota Original",

                "Nota Convertida (60)"

            ]);


            // Adicionar alunos

            alunos.forEach(function(aluno) {


                dados.push([

                    aluno.nome,

                    aluno.nota,

                    aluno.resultado

                ]);

            });


            // ==========================================
            // ADICIONAR RESUMO
            // ==========================================

            dados.push([]);

            dados.push([

                "RESUMO"

            ]);


            dados.push([

                "Quantidade de alunos",

                alunos.length

            ]);


            // Calcular média

            let soma = 0;


            alunos.forEach(function(aluno) {

                soma += aluno.resultado;

            });


            let media = soma / alunos.length;


            // Encontrar maior

            let alunoMaior = alunos[0];


            alunos.forEach(function(aluno) {


                if (

                    aluno.resultado >

                    alunoMaior.resultado

                ) {

                    alunoMaior = aluno;

                }

            });


            // Encontrar menor

            let alunoMenor = alunos[0];


            alunos.forEach(function(aluno) {


                if (

                    aluno.resultado <

                    alunoMenor.resultado

                ) {

                    alunoMenor = aluno;

                }

            });


            dados.push([

                "Média",

                Number(media.toFixed(2))

            ]);


            dados.push([

                "Maior nota",

                alunoMaior.resultado,

                alunoMaior.nome

            ]);


            dados.push([

                "Menor nota",

                alunoMenor.resultado,

                alunoMenor.nome

            ]);


            // ==========================================
            // CRIAR PLANILHA
            // ==========================================

            let planilha =

                XLSX.utils.aoa_to_sheet(dados);


            // Ajustar largura das colunas

            planilha["!cols"] = [

                { wch: 30 },

                { wch: 18 },

                { wch: 25 }

            ];


            // Criar arquivo Excel

            let arquivo =

                XLSX.utils.book_new();


            // Adicionar planilha

            XLSX.utils.book_append_sheet(

                arquivo,

                planilha,

                "Notas"

            );


            // ==========================================
            // BAIXAR
            // ==========================================

            XLSX.writeFile(

                arquivo,

                "notas_alunos.xlsx"

            );

        }