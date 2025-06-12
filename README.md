# Teste de Estresse - STG

Este repositório contém os testes de performance realizados com o Apache JMeter no ambiente de homologação (STG) da aplicação Stratega.

## Ambiente testado

[http://map.sit.internal-quattrus.com/editor](http://map.sit.internal-quattrus.com/editor)

## Estrutura do repositório

- `Scripts/` → Contém os arquivos `.jmx` utilizados para simulação de carga e estresse.
- `Imagens/` → Prints dos testes, configurações e evidências visuais.
- `README.md` → Este arquivo de documentação.

> A pasta `Resultados/` foi removida do repositório por conter arquivos grandes e foi adicionada ao `.gitignore`.

## Objetivo dos testes

Avaliar a performance e estabilidade da aplicação Stratega sob diferentes cargas de usuários simultâneos, simulando:

- Carga moderada (ex: 50 usuários)
- Estresse elevado (ex: 200 usuários)
- Carga contínua por longos períodos

## Ferramentas utilizadas

- [Apache JMeter](https://jmeter.apache.org/) v5.6.3
- Navegador Google Chrome (execução do sistema)
- Windows 10

## Autor

Gabriella Braz — Analista de QA Jr  
📧 Contato: [seu-email@exemplo.com]
