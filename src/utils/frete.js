export default function calcularfrete(cep, zonas, base, valorMinimoFrete, valorPedido) {
    if ((valorMinimoFrete > 0) && (valorPedido > valorMinimoFrete)) return 'FRETE GRÁTIS'
    switch (parseInt(cep.charAt(0))) {
        //SP
        case 0:
            if (!zonas[0].status) return 0;
            switch (parseInt(cep.charAt(1))) {
                // Cidade de SP
                case 1:
                    //Centro
                    if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                    if (!zonas[0].sub_zonas_fretes[1].setores_fretes[0].status) return 0 // setor cidade de sp
                    return base * zonas[0].sub_zonas_fretes[1].setores_fretes[0].multiplicador;
                case 2:
                    //Zona Norte
                    if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                    if (!zonas[0].sub_zonas_fretes[1].setores_fretes[1].status) return 0 // setor cidade de sp
                    return base * zonas[0].sub_zonas_fretes[1].setores_fretes[1].multiplicador;

                case 3:
                    //Zona Leste
                    if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                    if (!zonas[0].sub_zonas_fretes[1].setores_fretes[2].status) return 0 // setor cidade de sp
                    return base * zonas[0].sub_zonas_fretes[1].setores_fretes[2].multiplicador;

                case 8:
                    //Zona Leste e outros
                    if (parseInt(cep.substring(2, 5)) <= 499) {
                        //Zona Leste
                        if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                        if (!zonas[0].sub_zonas_fretes[1].setores_fretes[2].status) return 0 // setor cidade de sp
                        return base * zonas[0].sub_zonas_fretes[1].setores_fretes[2].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 500 && parseInt(cep.substring(2, 5)) <= 549) {
                        // GRANDE SP
                        //Ferraz De Vasconcelos
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[0].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[0].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 550 && parseInt(cep.substring(2, 5)) <= 569) {
                        //Poá 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[1].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[1].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 570 && parseInt(cep.substring(2, 5)) <= 599) {
                        //Itaquaquecetuba 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[2].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[2].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 600 && parseInt(cep.substring(2, 5)) <= 699) {
                        //Suzano 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[3].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[3].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 700 && parseInt(cep.substring(2, 5)) <= 899) {
                        //Mogi das Cruzes
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[4].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[4].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 900 && parseInt(cep.substring(2, 5)) <= 999) {
                        //Guararema 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[5].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[5].multiplicador;
                    } else {
                        return base * zonas[0].sub_zonas_fretes[0].multiplicador;
                    }

                case 4:
                    //Zona Sul
                    if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                    if (!zonas[0].sub_zonas_fretes[1].setores_fretes[3].status) return 0 // setor cidade de sp
                    return base * zonas[0].sub_zonas_fretes[1].setores_fretes[3].multiplicador;
                case 5:
                    // Zona Oeste
                    if (!zonas[0].sub_zonas_fretes[1].status) return 0 // cidade de sp
                    if (!zonas[0].sub_zonas_fretes[1].setores_fretes[4].status) return 0 // setor cidade de sp
                    return base * zonas[0].sub_zonas_fretes[1].setores_fretes[4].multiplicador;
                //outros
                case 6:
                    // GRANDE SP
                    if (parseInt(cep.substring(2, 5)) <= 299) {
                        //Osasco 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[6].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[6].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 300 && parseInt(cep.substring(2, 5)) <= 399) {
                        //Carapicuíba  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[7].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[7].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 400 && parseInt(cep.substring(2, 5)) <= 499) {
                        //Barueri  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[8].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[8].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 500 && parseInt(cep.substring(2, 5)) <= 549) {
                        //Santana do Parnaíba 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[9].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[9].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 600 && parseInt(cep.substring(2, 5)) <= 649) {
                        //Jandira   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[10].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[10].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 650 && parseInt(cep.substring(2, 5)) <= 699) {
                        //Itapevi  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[11].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[11].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 700 && parseInt(cep.substring(2, 5)) <= 729) {
                        //Cotia  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[12].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[12].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 730 && parseInt(cep.substring(2, 5)) <= 749) {
                        //Vargem Grande Paulista 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[13].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[13].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 750 && parseInt(cep.substring(2, 5)) <= 799) {
                        //Taboão da Serra 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[14].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[14].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 800 && parseInt(cep.substring(2, 5)) <= 849) {
                        //Embu  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[15].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[15].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 850 && parseInt(cep.substring(2, 5)) <= 899) {
                        //Itapecirica da Serra 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[16].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[16].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 900 && parseInt(cep.substring(2, 5)) <= 999) {
                        //Embu-Guaçu 
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[17].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[17].multiplicador;
                    } else {
                        //Possiveis locais não listados acima ou cep onde não entregamos
                        return base * zonas[0].sub_zonas_fretes[2].multiplicador;
                    }

                case 7:
                    // GRANDE SP
                    if (parseInt(cep.substring(2, 5)) <= 399) {
                        //Guarulhos   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[18].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[18].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 400 && parseInt(cep.substring(2, 5)) <= 499) {
                        //Arujá   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[19].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[19].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 500 && parseInt(cep.substring(2, 5)) <= 599) {
                        //Santa Isabel  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[20].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[20].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 600 && parseInt(cep.substring(2, 5)) <= 699) {
                        //Mairiporã   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[21].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[21].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 700 && parseInt(cep.substring(2, 5)) <= 749) {
                        //Caieiras   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[22].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[22].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 750 && parseInt(cep.substring(2, 5)) <= 759) {
                        //Cajamar   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[23].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[23].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 760 && parseInt(cep.substring(2, 5)) <= 769) {
                        //Jordanesia   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[24].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[24].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 770 && parseInt(cep.substring(2, 5)) <= 799) {
                        //Polvilho   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[25].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[25].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 800 && parseInt(cep.substring(2, 5)) <= 870) {
                        //Franco da Rocha  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[26].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[26].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 900 && parseInt(cep.substring(2, 5)) <= 999) {
                        //Francisco Morato  
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[27].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[27].multiplicador;
                    } else {
                        //Possiveis locais não listados acima ou cep onde não entregamos
                        return base * zonas[0].sub_zonas_fretes[2].multiplicador;
                    }

                case 9:
                    // GRANDE SP
                    if (parseInt(cep.substring(2, 5)) <= 299) {
                        //Santo André   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[28].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[28].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 300 && parseInt(cep.substring(2, 5)) <= 399) {
                        //Mauá    
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[29].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[29].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 400 && parseInt(cep.substring(2, 5)) <= 449) {
                        //Ribeirão Pires   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[30].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[30].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 450 && parseInt(cep.substring(2, 5)) <= 499) {
                        //Rio Grande da Serra   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[31].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[31].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 500 && parseInt(cep.substring(2, 5)) <= 599) {
                        //São Caetano do Sul   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[32].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[32].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 600 && parseInt(cep.substring(2, 5)) <= 899) {
                        //São Bernardo do Campo   
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[33].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[33].multiplicador;
                    } else if (parseInt(cep.substring(2, 5)) >= 900 && parseInt(cep.substring(2, 5)) <= 999) {
                        //Diadema    
                        if (!zonas[0].sub_zonas_fretes[2].status) return 0 // grande de sp
                        if (!zonas[0].sub_zonas_fretes[2].setores_fretes[34].status) return 0 // setor grande de sp
                        return base * zonas[0].sub_zonas_fretes[2].setores_fretes[34].multiplicador;
                    } else {
                        //Possiveis locais não listados acima ou cep onde não entregamos
                        return base * zonas[0].sub_zonas_fretes[2].multiplicador;
                    }
                default:
                    return base * zonas[0].sub_zonas_fretes[0].multiplicador;
            }

        case 1:
            //SP(interior)
            if (!zonas[0].sub_zonas_fretes[0].status) return 0
            return base * zonas[0].sub_zonas_fretes[0].multiplicador;

        case 2:
            //RJ e ES
            if (!zonas[1].status) return 0
            return base * zonas[1].multiplicador;

        case 3:
            //MG
            if (!zonas[2].status) return 0
            return base * zonas[2].multiplicador;

        case 4:
            //BA e SE
            if (!zonas[3].status) return 0
            return base * zonas[3].multiplicador;

        case 5:
            //PE, AL, PB, RN
            if (!zonas[4].status) return 0
            return base * zonas[4].multiplicador;

        case 6:
            //CE, PI, MA, PA, AP, AM, RR, AC
            if (!zonas[5].status) return 0
            return base * zonas[5].multiplicador;

        case 7:
            //DF, GO, RO, TO, MT, MS
            if (!zonas[6].status) return 0
            return base * zonas[6].multiplicador;

        case 8:
            //PR E SC
            if (!zonas[7].status) return 0
            return base * zonas[7].multiplicador;

        case 9:
            //RS
            if (!zonas[8].status) return 0
            return base * zonas[8].multiplicador;

        default:
            return 0;
    }
}