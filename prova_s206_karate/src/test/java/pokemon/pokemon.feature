Feature: Testando API PokéAPI

Background: Executa antes de cada teste
    * def url_base = "https://pokeapi.co/api/v2/"
    * def url_base_post = "https://gorest.co.in/public/v2/"
    * def token = "access-token=32343feeab8a7867f9413d7221e8d7f4598ae24e7548c69d2e31e0a079791b8b"
    * def request_json = read("request_json.json")

Scenario: Testando retorno 200 de qualquer pokemon
    Given url url_base
    And path "pokemon/bulbasaur"
    When method get
    Then status 200

Scenario: Testando retorno raticate e verificando JSON
    Given url url_base
    And path "pokemon/raticate"
    When method get
    Then status 200
    And match $.id == 20
    And match $.abilities[0].ability.name == "#string"

Scenario: Testando erro com informação inválida
    Given url url_base
    And path "pokemon/pokemon"
    When method get
    Then status 404

Scenario: Testando método POST, adicionando um pokemon no Go Rest
    Given url url_base_post
    And path "users?" + token
    And request request_json
    When method post
    Then status 201
    And match $.id == '#number'
    And match $.name == '#string'
    And match $.gender == '#string'
    And match $.status == '#string'    
    
Scenario: Testando retorno do array da URL
    Given url url_base
    And path "pokemon/pikachu"
    When method get
    Then status 200
    And def ability = $.abilities[1].ability.url
    And url ability
    When method get
    Then status 200
    And match $.id == 31
    And match $.name == "lightning-rod"

    