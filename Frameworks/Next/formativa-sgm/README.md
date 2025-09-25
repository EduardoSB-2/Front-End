# Sistema de Gestão de Manutenção (SGM)

## Briefing
O projeto consiste no desenvolvimento de um Sistema de Gestão de Manutenção (SGM) no formato de uma aplicação web. O objetivo é centralizar e otimizar o controle das atividades de manutenção de máquinas e equipamentos de uma empresa. A plataforma permitirá o cadastro de equipamentos, agendamento de manutenções preventivas e corretivas, e o gerenciamento de ordens de serviço.

## Objetivo do Projeto
- Gerenciar informações sobre equipamentos e manutenção realizadas pela empresa
- Realizar aberturas de chamados de manutenção (ordens de serviço)
- Dashboard de históricos de manutenção
- Proteger acesso aos dados do sistema (criptografia e autenticação segura de usuários)

## Público-Alvo
- Tecnicos de manutenção (usuários finais)
- Gerente de manutenção (usuários intermediários)
- Administradores do sistema (gerenciar a permissão dos usuários)

##  Levantamento de Requisitos do Projeto
- ### Requisitos Funcionais
- ### Requisitos Não Funcionais

## Recursos do Projeto
- ### Tecnológicos
- Frameowrk de desenvolvimento Next/React
- Linguagem de programação: TypeScript
- Banco de dados: Não Relacional (MongoDB)
- Github
- VsCode
- Figma

- ### Pessoal
- Dev

## Análise de Risco

## Diagramas

1. ### Classe
Descrever o comportamento das entidades de um projeto

- Usuários (User)
    - Atributo: id, nome, email, senha, função
    - Métodos: create, read, update, delete, login, logout

- Equipamento (Equipment)
    - Atributos: id, modelo, marca, localização, status
    numeroSerie
    - Métodos: CRUD
    
    - Ordem de Serviço (OrdemServiço)
- Atributos: id, titulo, descriçao, TipoManutenção, status, IdTecnico, IdEquipamento

```mermaid

classDiagram

class Usuario{
    +String id
    +String nome
    +String email       
    +String senha
    +String funcao
    +login()
    +logout()
    +CRUD()
}

classEquipamento{
    +String id
    +String modelo
    +String marca
    +String localizacao
    +boolean status
    +String numSerie
    +CRUD()
}

class OrdemServico{
    +String id
    +String titulo
    +String descricao
    +String tipoManutencao
    +Enum status
    +String idTecnico
    +String idEquipamento
    +CRUD() 
}

Usuario "1"--"1+" OrdemServico: "É responsável por"
Equipamento "1"--"1+" OrdemServico: "associada a"

```