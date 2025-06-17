# Teste de Estresse - STG

Este repositório contém os testes de performance realizados com o Apache JMeter nos ambientes de teste da aplicação Stratega.

O objetivo principal destes testes é avaliar a performance, estabilidade e capacidade de resposta da aplicação Stratega nos ambientes, simulando diferentes níveis de carga e uso simultâneo de usuários.
Os testes foram estruturados para identificar:

- Possíveis gargalos de performance sob uso contínuo e simultâneo;
- Tempo médio de resposta das requisições;
- Capacidade do sistema em manter a estabilidade sem apresentar falhas ou erros;
- Impacto da carga no tempo de resposta em cenários moderados e de estresse.

## Ambiente testado

[http://map.sit.internal-quattrus.com/editor](http://map.sit.internal-quattrus.com/editor)

## Estrutura do repositório

- `Scripts/` → Contém os arquivos `.jmx` utilizados para simulação de carga e estresse, e os `Dashboards` de cada teste realizado.
- `Imagens/` → Prints dos testes, configurações e evidências visuais.
- `README.md` → Este arquivo de documentação.

## Objetivo dos testes

Avaliar a performance e estabilidade da aplicação Stratega sob diferentes cargas de usuários simultâneos, simulando:

## 1° Teste:
- Carga moderada (50 usuários)
- Estresse elevado (200 usuários)
- Carga contínua por 60 minutos

## 2° Teste:
- Carga moderada (xxx usuários)
- Estresse elevado (xxx usuários)
- Carga contínua por (xxx minutos)



## Ferramentas utilizadas

- [Apache JMeter](https://jmeter.apache.org/) v5.6.3
- BlazeMeter v 6.6.7
- Navegador Google Chrome
- Windows 10

## Autor

Gabriella Braz — Analista de QA Jr  
📧 E-mail: gabriella.braz@quattrus.com
