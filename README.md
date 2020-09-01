# Back End Teste ZOOX

## Instalar dependencias
```
npm i
```

### Compilação em dev
```
node app.js 
ou
nodemon

OBS: eu utilizei nodemon
```
### Configuração dotEnv: Configurar .env colocando a porta que o sistema ira rodar e o link para o banco de dados mongo, exemplo:
```
PORT='NUMERO_DA_PORTA'
DB='http://url_do_banco_de_dados/nome_do_banco'
```

### Ferramentas utilizadas:
```
Node.js, Javascript, Express, cors, bodyParser.
```


# Endpoint de Estados

##### Endpoint para listar todos estados
```
METHOD: POST
url: http://{{base_url}}/states/get

REQUEST BODY 
{
page: number
}

```
##### Endpoint para filtrar estados
```
METHOD: POST
url: http://{{base_url}}/states/filter
```
1 opção de filtro
```
REQUEST BODY 
{
name: string
}
```
2 opção de filtro
```
REQUEST BODY 
{
initials: string
}

```
##### Endpoint para inserir estados
```
METHOD: POST
url: http://{{base_url}}/states

REQUEST BODY 
{
name: string,
initials: string
}
```
##### Endpoint para atualizar estado
```
METHOD: PUT
url: http://{{base_url}}/states/:id

REQUEST BODY 
{
name: string,
initials: string
}
```
##### Endpoint para deletar estado
```
METHOD: DELETE
url: http://{{base_url}}/states/:id

```


# Endpoint de Cidades

##### Endpoint para listar todas cidades
```
METHOD: POST
url: http://{{base_url}}/cities/get

REQUEST BODY 
{
page: number
}

```
##### Endpoint para filtrar cidades
```
METHOD: POST
url: http://{{base_url}}/cities/filter
REQUEST BODY 
{
name: string
}
```
##### Endpoint para inserir cidades
```
METHOD: POST
url: http://{{base_url}}/cities

REQUEST BODY 
{
name: string,
initials: string
}
```
##### Endpoint para atualizar cidades
```
METHOD: PUT
url: http://{{base_url}}/cities/:id

REQUEST BODY 
{
name: string,
initials: string
}
```
##### Endpoint para deletar cidade
```
METHOD: DELETE
url: http://{{base_url}}/cities/:id

```




