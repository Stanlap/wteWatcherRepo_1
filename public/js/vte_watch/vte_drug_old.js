$(document).ready(function () {

    // 3
    let objPatient = JSON.parse(localStorage.getItem('Patient'));
    localStorage.removeItem('Patient');
    // console.log(objPatient.pkMedProfile);

    // 2
    $('<div/>').attr({
            id: 'invitToAct_11'
        })
        .html('')
        .appendTo('#dialogMain');
    $('<div/>').attr({
        id: 'dialog_0'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
        id: 'dialog_1'
    }).appendTo('#dialogMain');
    $('<select/>').attr({
            id: 'select_1',
            value: ''
        })
        .appendTo('#dialog_1');
    $('<div/>').attr({
        id: 'dialog_2'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
            id: 'invitToAct_21'
        })
        .appendTo('#dialog_2');
    $('<select/>').attr({
            id: 'select_2',
            value: ''
        })
        .appendTo('#dialog_2');
    $('<div/>').attr({
        id: 'dialog_3'
    }).appendTo('#dialogMain');
    $('<div/>').attr({
            id: 'invitToAct_31'
        })
        .appendTo('#dialog_3');
    $('<select/>').attr({
            id: 'select_3',
            value: ''
        })
        .appendTo('#dialog_3');
    $('<br>').attr({}).appendTo('#dialogMain');
    $('<input/>').attr({
            id: 'btnOne_1',
            type: 'button',
            value: 'OK'
        })
        .appendTo('#dialogMain');

    // 1
    $('<div/>').attr({
            id: 'invitToAct_1'
        }) // .html('Выберите препарат по МНН:')
        .appendTo('#drugChooser');
    $('<input/>').attr({
            id: 'inpText_4',
            type: 'text',
            list: 'dlstList_1'
        })
        .appendTo('#drugChooser');
    $('<br>').appendTo('#drugChooser');
    $('<label/>').attr({
            id: 'lblLatinTitle',
            for: 'chkUseLatinDrugName'
        })
        .hide()
        .html('Указывать латинское название')
        .appendTo('#drugChooser');
    $('<input/>').attr({
            type: 'checkbox',
            id: 'chkUseLatinDrugName'
        })
        .appendTo('#lblLatinTitle');
    $('<div/>').attr({
            id: 'invitToAct_2'
        })
        .html('Выберите разовую дозу препарата:')
        .hide()
        .appendTo('#drugChooser');
    $('<input/>').attr({
            id: 'inpText_2',
            type: 'text',
            list: 'dlstList_2'
        })
        .hide()
        .appendTo('#drugChooser');
    $('<datalist/>').attr({
            id: 'dlstList_2',
        })
        .appendTo('#inpText_2');


    let vHasVTEProph = confirm('Если пациент уже получает антикоагулянтную терапию, нажмите "OK"');
    // console.log(vHasVTEProph);

    // 3
    objPatient.pkRiskVTE === 1 ? delete objDrugsList['Bemiparinum natrium'].drugs['Zibor 3500'] : objPatient.pkRiskVTE === 2 ? delete objDrugsList['Bemiparinum natrium'].drugs['Zibor 2500'] : '';

    function getArrPairs(vArr, ) {
        return Object.keys(vArr).map(function (index) {
            return vArr[index].pair;
        });
    }
    let vArrPairs = getArrPairs(objDrugsList);
    console.log(vArrPairs);

    function getObjFromArrPairs(vArrP) {
        let vObjP = {};
        $(vArrP).each(function (index) {
            vObjP[Object.keys(vArrP[index])] = Object.values(vArrP[index])[0];
        });
        return vObjP;
    }

    let vObjDrugPairs = getObjFromArrPairs(vArrPairs);
    console.log(vObjDrugPairs);
    vObjDrugPairs = checkConditions();

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    // 2 
    let ChoosedMedicinesArr = [],
        lineOfFuncs = [],
        objChoosedMedicine_1 = {};
    lineOfFuncs.push(askGroupOfMedicine, askNameOfMedicine, askOfficDoseOfMedicine);
    // console.log(lineOfFuncs)
    vHasVTEProph ? lineOfFuncs.push(askRealSingleDoseOfMedicine) : '';
    clearValues();
    executeFuncsLine();


    // 1
    addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));

    let vPrevUsedDrugGroup = '';

    $('#invitToAct_1').html('Выберите лек. группу препарата:');

    $('#inpText_4').bind('input', doFirstChoice);

    $('#btnOne').hide();


    // 2
    function clearValues() {
        $('#invitToAct_11, #invitToAct_21, #invitToAct_31').html('');
        $('#dialog_1, #dialog_2, #dialog_3').hide();
        $('#select_1, #select_2, #select_3').off('input').empty();
        $('#btnOne_1').off('click');
    }

    function executeFuncsLine() {
        lineOfFuncs.length > 0 ? (lineOfFuncs[0](), lineOfFuncs.shift()) : '';
    }

    function askGroupOfMedicine() {
        console.log('askGroupOfMedicine');
        $('#invitToAct_11').html('Выберите лек. группу препарата:');
        $('#dialog_1').show();
        $.each(vObjDrugPairs, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });
        $('#btnOne_1').on('click', defineOfGroupOfMedicine);
        $('#select_1').on('input', tryChooseDrugGroup_2);
    }

    function defineOfGroupOfMedicine() {
        objChoosedMedicine_1.titleGroupRu = $('#select_1').val();
        $.each(vObjDrugPairs, function (index, value) {
            value === objChoosedMedicine_1.titleGroupRu ? objChoosedMedicine_1.titleGroupLat = index : '';
        });
        console.log(objChoosedMedicine_1.titleGroupRu, objChoosedMedicine_1.titleGroupLat);
        clearValues();
        executeFuncsLine();
    }

    // 1
    function doFirstChoice() {
        console.log('func_0');
        // vObjDrugPairs = checkConditions();
        vPrevUsedDrugGroup = getKeyByValue(vObjDrugPairs, $('#inpText_4').val());
        $('#btnOne').show();
        tryChooseDrugGroup();
        $('#inpText_4').val('');
        $('#inpText_4').unbind('input', doFirstChoice);

    };

    // 3
    function checkConditions() {
        objPatient.pkDateOfChildbirth === formatDate() ? delete vObjDrugPairs['Heparin sodium'] : '';
        if (objPatient.pkAge < 18) {
            with(vObjDrugPairs) {
                delete Apixaban;
                delete Rivaroxaban;
            }
            delete vObjDrugPairs['Enoxaparin sodium'];
            delete vObjDrugPairs['Nadroparin calcium'];
            delete vObjDrugPairs['Bemiparinum natrium'];
            delete vObjDrugPairs['Dabigatran etexilate'];
            delete vObjDrugPairs['Acetylsalicylic acid'];
        };
        (objPatient.pkAge > 60) ? delete vObjDrugPairs.Warfarin: '';
        if (objPatient.pkSevereHepaticFailure) {
            with(vObjDrugPairs) {
                delete Rivaroxaban;
                delete Apixaban;
                delete Warfarin;
            }
            delete vObjDrugPairs['Heparin sodium'];
            delete vObjDrugPairs['Dabigatran etexilate'];
            delete vObjDrugPairs['Acetylsalicylic acid'];
        };
        (objPatient.pkHeartInsuff3_4 || objPatient.pkActiveUlcerOfStomachOrDuodenum) ? delete vObjDrugPairs['Acetylsalicylic acid']: '';
        objPatient.pkUncontrolledSystemicHypertension ? delete vObjDrugPairs['Heparin sodium'] : '';
        (objPatient.pkIsOrNoSurg && objPatient.pkPullOfSurg) ? delete vObjDrugPairs['Heparin sodium']: '';
        objPatient.pkSevereHepaticFailure ? delete vObjDrugPairs['Bemiparinum natrium'] : '';
        (objPatient.pkCC < 15 || objPatient.pkChronicDialysis) ? (delete vObjDrugPairs.Rivaroxaban, delete vObjDrugPairs.Edoxaban) : '';
        (objPatient.pkCC < 30 || objPatient.pkChronicDialysis) ? (delete vObjDrugPairs['Acetylsalicylic acid'], delete vObjDrugPairs['Dabigatran etexilate'], delete vObjDrugPairs['Fondaparinux sodium'], delete vObjDrugPairs.Warfarin) : '';

        objPatient.pkWeekOfPregnancy > 0 ? (delete vObjDrugPairs['Heparin sodium'], delete vObjDrugPairs.Rivaroxaban, delete vObjDrugPairs.Apixaban) : '';
        (objPatient.pkWeekOfPregnancy > 0 && objPatient.pkArtificialHeartValve) ? delete vObjDrugPairs['Enoxaparin sodium']: '';

        (objPatient.pkWeekOfPregnancy < 13 || objPatient.pkWeekOfPregnancy > 28) && objPatient.pkWeekOfPregnancy !== 0 ? delete vObjDrugPairs['Acetylsalicylic acid'] : '';
        objPatient.pkWeekOfPregnancy > 36 ? delete vObjDrugPairs.Warfarin : '';

        if (objPatient.vGender == 0 && objPatient.pkAge < 45 && objPatient.pkWeekOfPregnancy == 0) {
            let vAns = confirm('Если пациентка кормит грудью, следует отменить грудное вскармливание. Ваше решение?');
            if (vAns == false) {
                with(vObjDrugPairs) {
                    delete Apixaban;
                    delete Rivaroxaban;
                    delete Warfarin;
                }
                delete vObjDrugPairs['Acetylsalicylic acid'];
                delete vObjDrugPairs['Dabigatran etexilate'];
                delete vObjDrugPairs['Heparin sodium'];
            }
        };
        return vObjDrugPairs;
    };

    // 1

    function addOptionsToDatalist(vDrug, vDL) {
        vDL.find('option').remove();
        $.each(vDrug, function (key, value) {
            vDL.append($('<option>', {
                    key: value
                })
                .text(value));
        });
        vDrug = {};
    }
    addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));

    $('#chkUseLatinDrugName').on('click', function () {
        $(this).is(':checked') ? $('#drugLatinName, #inpText_2').show() : $('#drugLatinName, #inpText_2').hide();
    });

    function tryChooseDrugGroup() {
        console.log('func_1');

        if (!objPatient.pkIsOrNoSurg && objPatient.pkPullOfSurg && $('#inpText_4').val() === 'Гепарин натрия') {
            vDecision = confirm('Гепарин противопоказан при офтальмологических операциях. Отказаться от данного препарата?');
            vDecision ? (delete vObjDrugPairs['Heparin sodium'], !vDecision) : '';
        };
        if ($('#inpText_4').val() === 'Гепарин натрия' && objPatient.pkDiabetes) {
            vDecision = confirm('Гепарин противопоказан при наличии диабетической ретинопатии. Отказаться от данного препарата?');
            vDecision ? (delete vObjDrugPairs['Heparin sodium'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
        };
        if ($('#inpText_4').val() === 'Ацетилсалициловая кислота') {
            vDecision = confirm('Ацетилсалициловая кислота противопоказана при приеме с метотрексатом в дозе 15 мг в неделю и более, бронх. астме, индуцированной приемом салицилатов. Отказаться от данного препарата?');
            vDecision ? (delete vObjDrugPairs['Acetylsalicylic acid'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
        };
        if ($('#inpText_4').val() === 'Ривароксабан') {
            vDecision = confirm('Ривароксабан противопоказан при врожденном дефиците лактозы. Отказаться от данного препарата?');
            vDecision ? (delete vObjDrugPairs['Rivaroxaban'], !vDecision, $('#inpText_4').val('')) : $('#inpText_4').val('');
        };
        !vObjDrugPairs.hasOwnProperty(vPrevUsedDrugGroup) && vPrevUsedDrugGroup ? alert(`Препараты группы ${vPrevUsedDrugGroup} противопоказаны данному пациенту, выберите другой.`) : '';
        addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
        $('#btnOne').hide();
        $('#inpText_4').unbind('input', doFirstChoice);
        $('#inpText_4').bind('input', passManagementToButtonOne);
    }

    // 2
    let tCtr = [0, 0, 0, 0];

    function tryChooseDrugGroup_2() {
        console.log('func_1');
        if (!objPatient.pkIsOrNoSurg && objPatient.pkPullOfSurg && $('#select_1').val() === 'Гепарин натрия' && tCtr[0] === 0) {
            vDecision = confirm('Гепарин противопоказан при офтальмологических операциях. Отказаться от данного препарата?');
            vDecision ? ($('#select_1 :selected').remove(), !vDecision) : tCtr[0] = 1;
        };
        if ($('#select_1').val() === 'Гепарин натрия' && objPatient.pkDiabetes && tCtr[1] === 0) {
            vDecision = confirm('Гепарин противопоказан при наличии диабетической ретинопатии. Отказаться от данного препарата?');
            vDecision ? ($('#select_1 :selected').remove(), !vDecision) : tCtr[1] = 0;
        };
        if ($('#select_1').val() === 'Ацетилсалициловая кислота' && tCtr[2] === 0) {
            vDecision = confirm('Ацетилсалициловая кислота противопоказана при приеме с метотрексатом в дозе 15 мг в неделю и более, бронх. астме, индуцированной приемом салицилатов. Отказаться от данного препарата?');
            vDecision ? ($('#select_1 :selected').remove(), !vDecision) : tCtr[2] = 1;
        };
        if ($('#select_1').val() === 'Ривароксабан' && tCtr[3] === 0) {
            vDecision = confirm('Ривароксабан противопоказан при врожденном дефиците лактозы. Отказаться от данного препарата?');
            vDecision ? ($('#select_1 :selected').remove(), !vDecision, $('#select_1').val('')) : tCtr[3] = 1;
        };
    };

    // 1
    function passManagementToButtonOne() {
        $('#btnOne').show().bind('click', chooseDrugGroup);
    };
    let choosedDrugGroupRu = '';

    // 2
    function askNameOfMedicine() {
        console.log('askNameOfMedicine');
        $('#invitToAct_11').text('Выберите препарат по коммерческому названию:');
        $('#dialog_1').show();

        $.each(vObjDrugPairs, function (index, value) {
            value === objChoosedMedicine_1.titleGroupRu ? objChoosedDrug.objChoosedDrugGroupLat = index : '';
        });
        console.log(vObjDrugPairs);

        vArrPairs = Object.keys(objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs).map(function (name) {
            return [objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameCyr, objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameLat];
        });

        vObjDrugPairs = {};
        vArrPairs.forEach(item => vObjDrugPairs[item[1]] = item[0]);
        console.log(vObjDrugPairs);

        $.each(vObjDrugPairs, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });

        $('#btnOne_1').on('click', defineNameOfMedicine);
    };

    function defineNameOfMedicine() {
        $.each(vObjDrugPairs, function (index, value) {
            value === $('#select_1').val() ? (objChoosedMedicine_1.titleMedicineLat = index, objChoosedMedicine_1.titleMedicineRu = value) : '';
        });
        console.log(objChoosedMedicine_1.titleMedicineLat, objChoosedMedicine_1.titleMedicineRu);
        clearValues();
        executeFuncsLine();
    }

    // 1
    function chooseDrugGroup() {
        $('#invitToAct_1').text('Выберите препарат по коммерческому названию:');

        console.log('func_2');
        $('#inpText_4').unbind('input', passManagementToButtonOne);

        $('#inpText_4').val() === '' ? alert('Введите название лекарственного препарата.') : '';

        $('#btnOne, #lblLatinTitle').show();
        $('#inpText_2').val('');

        objChoosedDrug.objChoosedDrugGroup = $('#inpText_4').val();
        choosedDrugGroupRu = objChoosedDrug.objChoosedDrugGroup
        console.log(objChoosedDrug.objChoosedDrugGroup);

        $.each(vObjDrugPairs, function (index, value) {
            value === objChoosedDrug.objChoosedDrugGroup ? objChoosedDrug.objChoosedDrugGroupLat = index : '';
        });

        vArrPairs = Object.keys(objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs).map(function (name) {
            return [objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameCyr, objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs[name].nameLat];

        });
        vObjDrugPairs = {};
        vArrPairs.forEach(item => vObjDrugPairs[item[1]] = item[0]);

        console.log(vObjDrugPairs);
        addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
        $('#inpText_4').val('');
        $('#btnOne').hide();
        $('#inpText_4').bind('input', chooseDrug);
        $('#btnOne').unbind('click', chooseDrugGroup);

    };

    function chooseDrug() {
        console.log('func_3');

        $.each(vObjDrugPairs, function (index, value) {
            value === $('#inpText_4').val() ? $('#inpText_2').val(index) : '';
        });

        $('#inpText_4').val() === '' ? $('#inpText_2').val('') : '';
        $('#btnOne').show();
        $('#btnOne').bind('click', addDrugTitles);

    }

    function addDrugTitles() {
        console.log('func_4');
        $('#inpText_4').unbind('input', chooseDrug);
        objChoosedDrug.titleCyr = $('#inpText_4').val();
        objChoosedDrug.titleLat = $('#inpText_2').val();

        $('#inpText_4').val('');
        $('#invitToAct_1').text('Выберите аптечную дозу препарата:');
        $('#lblLatinTitle, #inpText_2').hide();
        if (objChoosedDrug.objChoosedDrugGroupLat === 'Acetylsalicylic acid') {
            $('#inpText_2, #invitToAct_2').show();
            $('#inpText_2').val('');
            vSingleDosesList = {
                1: '100',
                2: '200',
                3: '300'
            };
            addOptionsToDatalist(vSingleDosesList, $('#dlstList_2'));
        };
        let vTPath_1 = objDrugsList['Dabigatran etexilate'];
        (objPatient.vMedProfile === 2 && (objPatient.pkAge > 75 || objPatient.pkCC < 51)) ? (vTPath_1.singleProphDose = 110, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
        if (objPatient.vMedProfile === 4) {
            vTPath_1.timesADay = 1;
            objPatient.pkAge < 76 ? (vTPath_1.singleProphDose = 220, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
        };

        let vTPath_3 = objDrugsList[objChoosedDrug.objChoosedDrugGroupLat].drugs;
        addOptionsToDatalist(vTPath_3[objChoosedDrug.titleLat].officDose, $('#dlstList_1'));

        $('#inpText_4').unbind('input', chooseDrug);
        console.log(objChoosedDrug.titleLat);
        $('#inpText_4').bind('input', attachFunc_makeNoteOfDrug);

        $('#btnOne').unbind('click', addDrugTitles).hide();

    };

    // 2 
    let vTPath_2 = '',
        vTPath_3 = '';

    function askOfficDoseOfMedicine() {
        console.log('askOfficDoseOfMedicine');

        let vTPath_1 = objDrugsList['Dabigatran etexilate'];
        vTPath_2 = objDrugsList[objChoosedMedicine_1.titleGroupLat],
            vTPath_3 = vTPath_2.drugs;

        (objPatient.vMedProfile === 2 && (objPatient.pkAge > 75 || objPatient.pkCC < 51)) ? (vTPath_1.singleProphDose = 110, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
        if (objPatient.vMedProfile === 4) {
            vTPath_1.timesADay = 1;
            objPatient.pkAge < 76 ? (vTPath_1.singleProphDose = 220, vTPath_1.drugs.Pradaxa.officDose = [110]) : '';
        };

        $('#invitToAct_11').text(`Выберите аптечную дозу препарата (${vTPath_2.officUnits}):`);
        $('#dialog_1').show();

        $.each(vTPath_3[objChoosedMedicine_1.titleMedicineLat].officDose, function (key, value) {
            $('#select_1').append('<option value="' + value + '">' + value + '</option>');
        });
        if (objChoosedMedicine_1.titleGroupLat === 'Acetylsalicylic acid') {
            $('#invitToAct_21').text(`Выберите разовую дозу препарата (${vTPath_2.officUnits}):`);
            $('#dialog_2').show();
            $.each([100, 200, 300], function (key, value) {
                $('#select_2').append('<option value="' + key + '">' + value + '</option>');
            });
            $('#select_2').on('input', askAspirineTakingShedule);
        };
        $('#btnOne_1').on('click', defineOfficDoseOfMedicine);
    };

    function defineOfficDoseOfMedicine() {
        console.log('defineOfficDoseOfMedicine');
        objChoosedMedicine_1.officDose = +$('#select_1').val();
        $('#select_2').val() ? objChoosedMedicine_1.singleDoseOfAspirin = $('#select_2 :selected').text() : objChoosedMedicine_1.singleDoseOfAspirin = '';
        $('#select_3').val() ? objChoosedMedicine_1.sheduleAspirinTakingDaily = $('#select_3 :selected').text() : objChoosedMedicine_1.sheduleAspirinTakingDaily = '';
        console.log(objChoosedMedicine_1.officDose, objChoosedMedicine_1.singleDoseOfAspirin, objChoosedMedicine_1.sheduleAspirinTakingDaily);
                // let vTGLat = objDrugsList[vOCM.titleGroupLat],
        //     vOfDos = vOCM.officDose,
        //     vOfDosGen = vOCM.officDose,
        console.log(parseFloat($('#select_1').val()));
        makeSignatureOfMedicine(objChoosedMedicine_1,objDrugsList[objChoosedMedicine_1.titleGroupLat], objChoosedDrug.officDose, objChoosedMedicine_1.officDose);
        clearValues();
        executeFuncsLine();
    }

    function askAspirineTakingShedule() {
        console.log('askAspirineTakingShedule', $('#select_2').val());
        if (+($('#select_2').val()) === 2) {
            $('#dialog_3').show();
            $('#invitToAct_31').text('Выберите частоту приема препарата:');
            $.each(['ежедневно', 'через день'], function (key, value) {
                $('#select_3').append('<option value="' + key + '">' + value + '</option>');
            });
        }
    }

    function askRealSingleDoseOfMedicine() {
        console.log('askRealSingleDoseOfMedicine');
        $('#invitToAct_11').text(`Укажите разовую дозу препарата, которую уже получает пациент (${vTPath_2.officUnits}):`);
        $('<input/>').attr({
            id: 'inpText_11',
            type: 'number',
            value: objChoosedMedicine_1.officDose
        }).appendTo('#dialog_0');
        $('#btnOne_1').on('click', defineRealSingleDoseOfMedicine);
    }

    function defineRealSingleDoseOfMedicine() {
        console.log('defineRealSingleDoseOfMedicine');
        let tRSD = correctEnteredValue($('#inpText_11').val());
        !isFinite(tRSD) || tRSD === 0 ? (alert(`Вы ввели некорректное значение ${$('#inpText_11').val()}`), $('#inpText_11').val('').focus()) : (objChoosedMedicine_1.realSingleDose = correctEnteredValue($('#inpText_11').val()), $('#inpText_11').hide(), $('#inpText_11').off('input'), clearValues(), executeFuncsLine());
        console.log(objChoosedMedicine_1);
    }

    function correctEnteredValue(el) {
        el = +el.replace(/\s+/g, '').replace(",", ".");
        return parseFloat(el.toFixed(1));
    }

// 1
    $('#inpText_2').on('input', function () {
        if (+($(this).val()) === 300 && objPatient.pkMedProfile === 4) {
            $('<br>').appendTo('#drugChooser');
            $('<div/>').attr({
                    id: 'invitToAct_3'
                })
                .html('Выберите частоту приема препарата:')
                .appendTo('#drugChooser');
            $('<input/>').attr({
                    id: 'inpText_3',
                    type: 'text',
                    list: 'dlstList_3'
                })
                .appendTo('#drugChooser');
            $('<datalist/>').attr({
                    id: 'dlstList_3',
                })
                .appendTo('#inpText_3');
            vDailyDosesList = {
                1: 'ежедневно',
                2: 'через день'
            };
            addOptionsToDatalist(vDailyDosesList, $('#dlstList_3'));
        }
    });

    function attachFunc_makeNoteOfDrug() {
        console.log('func_5');
        $('#btnOne').bind('click', makeNoteOfDrug).show();
        $('#inpText_4').unbind('input', attachFunc_makeNoteOfDrug);
    };

// 2
    function makeSignatureOfMedicine(vOCM, vTGLat, vOfDos, vOfDosGen) {
        console.log('makeSignatureOfMedicine');
        // let vTGLat = objDrugsList[vOCM.titleGroupLat],
        //     vOfDos = vOCM.officDose,
        //     vOfDosGen = vOCM.officDose,
        let vT_3,
            vT_4 = ' mg, ',
            vT_5 = '';

        switch (vOCM.titleGroupLat) {

            case 'Enoxaparin sodium':
                console.log('Enoxaparin sodium');
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 100;
                vOfDos.aXa = vOfDos.Ml * 10000;
                if (vOfDos.Mg === 30 && objPatient.vRiscVTE === 2) {
                    vTGLat.timesADay = 2;
                    vTGLat.singleProphDose = 30;
                }
                (objPatient.vRiscVTE === 1 || objPatient.pkCC < 30) ? (vTGLat.singleProphDose = 20, objChoosedDrug.numberOfOfficDose = 1) : '';
                vT_3 = vOfDos.Mg;
                while (vT_3 < vTGLat.singleProphDose) {
                    vT_3 += vT_3;
                    objChoosedDrug.numberOfOfficDose++;
                };
                vT_5 = (vTGLat.singleProphDose / 100) + ' ml, ';
                break;

            case 'Nadroparin calcium':
                console.log('Nadroparin calcium');

                vOfDos.Ml = vOfDosGen;
                vOfDos.aXa = vOfDos.Ml * 9500;
                ((objPatient.vMedProfile === 1 || objPatient.vMedProfile === 2) && objPatient.vWeight > 70) ? vTGLat.singleProphDose = 0.6: '';
                (objPatient.vMedProfile === 3) ? vTGLat.singleProphDose = 0.3: '';
                if (objPatient.vMedProfile === 4) {
                    objPatient.vWeight < 50 ? vTGLat.singleProphDose = 0.2 : objPatient.vWeight > 70 ? vTGLat.singleProphDose = 0.4 : vTGLat.singleProphDose = 0.3;
                };
                objPatient.pkCC < 30 ? vTGLat.singleProphDose = +(vTGLat.singleProphDose *= 0.75).toFixed(2) : '';

                vI = vOfDos.Ml;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    objChoosedDrug.numberOfOfficDose++;
                }
                vT_5 = vTGLat.singleProphDose + ' ml, ';
                vTGLat.singleProphDose *= 100;
                break;

            case 'Bemiparinum natrium':
                console.log('Bemiparinum natrium');
                vTGLat.singleProphDose = vOfDosGen;
                // objPatient.pkRiskVTE === 1 ? vTGLat.singleProphDose = 2500 : '';
                vT_4 = ' ME, ';
                break;

            case 'Heparin sodium':
                console.log('Heparin sodium');
                objPatient.vWeight < 50 ? vTGLat.timesADay = 2 : '';
                objPatient.vWeight > 150 ? vTGLat.singleProphDose = 6500 : '';
                vOfDos.ME = vOfDosGen;
                vOfDos.Ml = vOfDos.ME / 1000;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / 25000).toFixed(1);
                vT_4 = ' ME, ';
                break;

            case 'Fondaparinux sodium':
                console.log('Fondaparinux sodium');
                objPatient.pkCC < 50 ? vTGLat.singleProphDose *= 0.6 : '';
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 5;
                vT_5 = (vTGLat.singleProphDose) + ' ml, ';
                vTGLat.singleProphDose *= 5;
                break;

            case 'Acetylsalicylic acid':
                console.log('Acetylsalicylic acid');
                objChoosedMedicine_1.sheduleAspirinTakingDaily === 'через день' ?
                    objChoosedDrug.frequencyOfDrugTaking = '2 сут.' : '';
                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! problem
                // vOfDosGen = objChoosedMedicine_1.singleDoseOfAspirin;
                vOfDos.Mg = vOfDosGen;
                vTGLat.singleProphDose = objChoosedMedicine_1.singleDoseOfAspirin;
                objChoosedDrug.tempCont = (`${(vTGLat.singleProphDose/vOfDosGen).toFixed(1)} ${vTGLat.container},`);
                $('#btnTry').trigger('click').remove();
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDos.Mg).toFixed(1);
                break;

            case 'Dabigatran etexilate':
                console.log('Dabigatran etexilate');

                vOfDos.Mg = vOfDosGen;
                vI = vOfDosGen;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    objChoosedDrug.numberOfOfficDose++;
                }
                break;

            case 'Rivaroxaban':
                console.log('Rivaroxaban');
                (objPatient.pkCC > 30 || objPatient.pkCC < 51) ? vTGLat.singleProphDose = 15: '';
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Apixaban':
                console.log('Apixaban');
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Edoxaban':
                console.log('Edoxaban');
                (objPatient.pkCC > 15 || objPatient.pkCC < 51) ? vTGLat.singleProphDose = 30: '';
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Warfarin':
                console.log('Warfarin');
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;
        };
        vOCM.singleProphDose = (`${vTGLat.singleProphDose}${vT_4}${vT_5}`);
        vOCM.tempCont = (`${vTGLat.container} ${vOCM.numberOfOfficDose},`);
        let vTimE_S = 'раза';

        (vTGLat.timesADay === 1 || vTGLat.timesADay > 4) ? vTimE_S = 'раз': '';

        let vText_1 = convertObjPairsToString(vOfDos),
        vText_2 = (`${objChoosedDrug.tempCont} ${objChoosedDrug.singleProphDose}`);
        vOCM.signature = `${vOCM.titleMedicineRu} (${vOCM.titleMedicineLat}${vText_1}, ${vTGLat.container} 1) ${vTGLat.delivery}, ${vText_2} ${vTGLat.timesADay} ${vTimE_S}/${objChoosedDrug.frequencyOfDrugTaking}`;
        console.log(vOCM);
        ChoosedMedicinesArr.push(vOCM);
        }
// 3
        function convertObjPairsToString(vObj) {
            let vText = '',
                vPairs = Object.entries(vObj);
            vPairs.forEach(entry => {
                let key = entry[0];
                let value = entry[1];
                vText += (`, ${value} ${key}`);
            });
            return vText;
        }

        // function goToAssignSheet() {
        //     let serialObj = JSON.stringify(ChoosedMedicinesArr);
        //     localStorage.setItem('ChoosedMedicines', serialObj);
        //     $(location).attr('href', '/vte_assignment_sheet');
        // }

        // if (ChoosedMedicinesArr.length === 1) {
        //     let choiceSecondMedicineDecision = confirm('Вы планируете менять препарат в процессе профилактики ВТЭО?');
        //     if (choiceSecondMedicineDecision) {
        //         $('#inpText_4').val('');
        //         $('#btnOne').unbind('click', makeNoteOfDrug).hide();
        //         vArrPairs = getArrPairs(objDrugsList);
        //         vObjDrugPairs = getObjFromArrPairs(vArrPairs);
        //         vObjDrugPairs = checkConditions();
        //         addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
        //         $('#invitToAct_1').html('Выберите лек. группу препарата:');
        //         $('#inpText_4').bind('input', doFirstChoice);
        //     } else {
        //         goToAssignSheet();
        //     }
        // } else {
        //     goToAssignSheet();
        // }

// 1

function makeNoteOfDrug() {
        console.log('func_6');
        let vTGLat = objDrugsList[objChoosedDrug.objChoosedDrugGroupLat],
            vOfDos = objChoosedDrug.officDose,
            vOfDosGen = parseFloat($('#inpText_4').val()),
            vT_3,
            vT_4 = ' mg, ',
            vT_5 = '';

        switch (objChoosedDrug.objChoosedDrugGroupLat) {

            case 'Enoxaparin sodium':
                console.log('Enoxaparin sodium');
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 100;
                vOfDos.aXa = vOfDos.Ml * 10000;
                if (vOfDos.Mg === 30 && objPatient.vRiscVTE === 2) {
                    vTGLat.timesADay = 2;
                    vTGLat.singleProphDose = 30;
                }
                (objPatient.vRiscVTE === 1 || objPatient.pkCC < 30) ? (vTGLat.singleProphDose = 20, objChoosedDrug.numberOfOfficDose = 1) : '';
                vT_3 = vOfDos.Mg;
                while (vT_3 < vTGLat.singleProphDose) {
                    vT_3 += vT_3;
                    objChoosedDrug.numberOfOfficDose++;
                };
                vT_5 = (vTGLat.singleProphDose / 100) + ' ml, ';
                break;

            case 'Nadroparin calcium':
                console.log('Nadroparin calcium');

                vOfDos.Ml = vOfDosGen;
                vOfDos.aXa = vOfDos.Ml * 9500;
                ((objPatient.vMedProfile === 1 || objPatient.vMedProfile === 2) && objPatient.vWeight > 70) ? vTGLat.singleProphDose = 0.6: '';
                (objPatient.vMedProfile === 3) ? vTGLat.singleProphDose = 0.3: '';
                if (objPatient.vMedProfile === 4) {
                    objPatient.vWeight < 50 ? vTGLat.singleProphDose = 0.2 : objPatient.vWeight > 70 ? vTGLat.singleProphDose = 0.4 : vTGLat.singleProphDose = 0.3;
                };
                objPatient.pkCC < 30 ? vTGLat.singleProphDose = +(vTGLat.singleProphDose *= 0.75).toFixed(2) : '';

                vI = vOfDos.Ml;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    objChoosedDrug.numberOfOfficDose++;
                }
                vT_5 = vTGLat.singleProphDose + ' ml, ';
                vTGLat.singleProphDose *= 100;
                break;

            case 'Bemiparinum natrium':
                console.log('Bemiparinum natrium');
                vTGLat.singleProphDose = vOfDosGen;
                // objPatient.pkRiskVTE === 1 ? vTGLat.singleProphDose = 2500 : '';
                vT_4 = ' ME, ';
                break;

            case 'Heparin sodium':
                console.log('Heparin sodium');
                objPatient.vWeight < 50 ? vTGLat.timesADay = 2 : '';
                objPatient.vWeight > 150 ? vTGLat.singleProphDose = 6500 : '';
                vOfDos.ME = vOfDosGen;
                vOfDos.Ml = vOfDos.ME / 1000;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / 25000).toFixed(1);
                vT_4 = ' ME, ';
                break;

            case 'Fondaparinux sodium':
                console.log('Fondaparinux sodium');
                objPatient.pkCC < 50 ? vTGLat.singleProphDose *= 0.6 : '';
                vOfDos.Ml = vOfDosGen;
                vOfDos.Mg = vOfDos.Ml * 5;
                vT_5 = (vTGLat.singleProphDose) + ' ml, ';
                vTGLat.singleProphDose *= 5;
                break;

            case 'Acetylsalicylic acid':
                console.log('Acetylsalicylic acid');
                $('#inpText_3').val() === 'через день' ?
                    objChoosedDrug.frequencyOfDrugTaking = '2 сут.' : '';
                vOfDos.Mg = vOfDosGen;
                vTGLat.singleProphDose = $('#inpText_2').val();
                objChoosedDrug.tempCont = (`${(vTGLat.singleProphDose/vOfDosGen).toFixed(1)} ${vTGLat.container},`);
                $('#btnTry').trigger('click').remove();
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDos.Mg).toFixed(1);
                break;

            case 'Dabigatran etexilate':
                console.log('Dabigatran etexilate');

                vOfDos.Mg = vOfDosGen;
                vI = vOfDosGen;
                while (vI < vTGLat.singleProphDose) {
                    vI += vI;
                    objChoosedDrug.numberOfOfficDose++;
                }
                break;

            case 'Rivaroxaban':
                console.log('Rivaroxaban');
                (objPatient.pkCC > 30 || objPatient.pkCC < 51) ? vTGLat.singleProphDose = 15: '';
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Apixaban':
                console.log('Apixaban');
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Edoxaban':
                console.log('Edoxaban');
                (objPatient.pkCC > 15 || objPatient.pkCC < 51) ? vTGLat.singleProphDose = 30: '';
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;

            case 'Warfarin':
                console.log('Warfarin');
                vOfDos.Mg = vOfDosGen;
                objChoosedDrug.numberOfOfficDose = (vTGLat.singleProphDose / vOfDosGen).toFixed(1);
                break;
        };
        objChoosedDrug.singleProphDose = (`${vTGLat.singleProphDose}${vT_4}${vT_5}`);
        objChoosedDrug.tempCont = (`${vTGLat.container} ${objChoosedDrug.numberOfOfficDose},`);
        let vTimE_S = 'раза';

        function convertObjPairsToString(vObj) {
            let vText = '',
                vPairs = Object.entries(vObj);
            vPairs.forEach(entry => {
                let key = entry[0];
                let value = entry[1];
                vText += (`, ${value} ${key}`);
            });
            return vText;
        }
        (vTGLat.timesADay === 1 || vTGLat.timesADay > 4) ? vTimE_S = 'раз': '';

        let vText_1 = convertObjPairsToString(vOfDos),
            vText_2 = (`${objChoosedDrug.tempCont} ${objChoosedDrug.singleProphDose}`),
            objChoosedMedicine = {
                signature: `${objChoosedDrug.titleCyr} (${objChoosedDrug.titleLat}${vText_1}, ${vTGLat.container} 1) ${vTGLat.delivery}, ${vText_2} ${vTGLat.timesADay} ${vTimE_S}/${objChoosedDrug.frequencyOfDrugTaking}`,
                titleGroupRu: choosedDrugGroupRu,
                startDateOfVTEProphyl: new Date()

                // treatPeriod: 10
            };
        console.log(objChoosedMedicine.signature);
        ChoosedMedicinesArr.push(objChoosedMedicine);

        function goToAssignSheet() {
            let serialObj = JSON.stringify(ChoosedMedicinesArr);
            localStorage.setItem('ChoosedMedicines', serialObj);
            $(location).attr('href', '/vte_assignment_sheet');
        }

        if (ChoosedMedicinesArr.length === 1) {
            let choiceSecondMedicineDecision = confirm('Вы планируете менять препарат в процессе профилактики ВТЭО?');
            if (choiceSecondMedicineDecision) {
                $('#inpText_4').val('');
                $('#btnOne').unbind('click', makeNoteOfDrug).hide();
                vArrPairs = getArrPairs(objDrugsList);
                vObjDrugPairs = getObjFromArrPairs(vArrPairs);
                vObjDrugPairs = checkConditions();
                addOptionsToDatalist(vObjDrugPairs, $('#dlstList_1'));
                $('#invitToAct_1').html('Выберите лек. группу препарата:');
                $('#inpText_4').bind('input', doFirstChoice);
            } else {
                goToAssignSheet();
            }
        } else {
            goToAssignSheet();
        }
    };
});