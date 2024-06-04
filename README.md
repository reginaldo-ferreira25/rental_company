# rental_company


Para colocar a foto randonicamente, na funcao addOrUpdateDocument, antes de salvar 'await addDoc(collection(db, collectionName), data);', vc deve chamar a funcao de upload paara pegar a url de download do arquivo uploadFileAndGetDownloadUrl.

Salvar a url de download em um atributo do tipo string em seu banco de dados

Inserir o input de arquivos no html para pegar as informacoes

<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">Upload</span>
  </div>
  <div class="custom-file">
    <input type="file" class="custom-file-input" id="inputGroupFile01">
    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
  </div>
</div>
=======
Projeto criado pelos alunos: 
Alessandro Pinto Gonçalves,
Igor Barbosa de Souza Alves, 
Reginaldo Ferreira da Silva.

## demo online
https://reginaldo-ferreira25.github.io/rental_company/
