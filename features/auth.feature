Feature: Auth
  Scenario: solo aflogon@gmail.com puede entrar
    Given un email "aflogon@gmail.com"
    When valido acceso
    Then el acceso es permitido
