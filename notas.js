// ==========================================
        // ARRAY DOS ALUNOS
        // ==========================================

        let alunos = [];


        // ==========================================
        // ADICIONAR ALUNO
        // ==========================================

        function adicionarAluno() {

            let nome = document.getElementById("nome").value.trim();

            let nota = Number(
                document.getElementById("nota").value
            );


            // Verificar nome

            if (nome === "") {

                alert("Digite o nome do aluno.");

                return;

            }


            // Verificar nota

            if (
                document.getElementById("nota").value === "" ||
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
            // Math.round() arredonda o resultado
            //
            // Exemplo:
            //
            // 46 * 60 / 100 = 27.6
            //
            // Math.round(27.6) = 28
            // ==========================================

            let resultado = Math.round(
                (nota * 60) / 100
            );


            // Criar aluno

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

            document.getElementById("nota").value = "";

            document.getElementById("nome").focus();

        }


        // ==========================================
        // MOSTRAR ALUNOS
        // ==========================================

        function mostrarAlunos() {

            let tabela =
                document.getElementById("tabelaAlunos");


            tabela.innerHTML = "";


            // Nenhum aluno

            if (alunos.length === 0) {

                tabela.innerHTML = `
                    <tr>
                        <td colspan="4" class="vazio">
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


            // Quantidade

            document.getElementById("quantidade").innerText =
                quantidade;


            // Se não houver alunos

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

                if (aluno.resultado > alunoMaior.resultado) {

                    alunoMaior = aluno;

                }

            });


            // Mostrar maior nota

            document.getElementById("maior").innerText =
                alunoMaior.resultado;


            // Mostrar nome

            document.getElementById("alunoMaior").innerText =
                alunoMaior.nome;


            // ==========================================
            // MENOR NOTA
            // ==========================================

            let alunoMenor = alunos[0];


            alunos.forEach(function(aluno) {

                if (aluno.resultado < alunoMenor.resultado) {

                    alunoMenor = aluno;

                }

            });


            // Mostrar menor nota

            document.getElementById("menor").innerText =
                alunoMenor.resultado;


            // Mostrar nome

            document.getElementById("alunoMenor").innerText =
                alunoMenor.nome;

        }