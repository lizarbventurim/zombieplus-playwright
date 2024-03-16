#!/bin/bash

GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
WHITE='\033[1;37m'
C4='\033[1;36m'

NC='\033[0m' # No Color

echo "
▀█ █▀█ █▀▄▀█ █▄▄ █ █▀▀ ▄█▄
█▄ █▄█ █░▀░█ █▄█ █ ██▄ ░▀░
"

showhelp=false
len=0

for param in $@; do
	if [ $param = "help" ]; then
		showhelp=true
	fi
	len=$((len + 1))
done

# se não foi enviado parametro nenhum, exibir a tanela de help
if [ $len = 0 ]; then
	showhelp=true
fi

if [ $showhelp = true ]; then
echo "
| Opção |      Descrição      |
|-------|---------------------|
| ${GREEN}web${NC}   |   Aplicação Web     |
| ${GREEN}api${NC}   |    Somente Api      |
|-----------------------------|
| ${YELLOW}zombie${NC}| Aplicação Web + Api |
"


echo "${CYAN}EXEMPLOS:${NC}"
echo "$ sh start.sh ${GREEN}web{NC}"
echo "$ zombie ${GREEN}api"
echo " "

else
	str="npm run"
	eval $str

	for param in $@; do
    case "${param}" in
    zombie) 
        npm run start
        ;;
    web) 
        cd web && npm run web
        ;;
    api) 
        cd api && npm run api
        ;;
    *) 
        str="Serviço não encontrado: ${param}, selecione um serviço disponível" 
        ;;
    esac
done

	echo -e "${YELLOW}STRING GERADA:${NC} ${str}"
	echo " "

	eval $str
fi
