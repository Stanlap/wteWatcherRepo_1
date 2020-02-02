let objBallsRiskVTE = JSON.parse(localStorage.getItem('objScalesVTE'));
console.log(objBallsRiskVTE);
let objPatient = JSON.parse(localStorage.getItem('Patient'));
console.log(objPatient);

// function bindBalls(el) {
//     let vBalls;
//     if (el == 1) {
//         vBalls = ' балл';
//     }
//     if (el > 1 && counter < 5) {
//         vBalls = ' балла';
//     }
//     if (el > 4) {
//         vBalls = ' баллов';
//     }
//     return el + vBalls;
// }
function bindBalls(el) {
    switch (el) {
    case (el > 1 && counter < 5):
        end = 'а';
        break;
    case (el > 4):
        end = 'ов'; // code block
        break;
    default:
        end = ''; // code block
}
return `${el} балл${end}`;
}


function countStratRF(vCounterRF, x) {
    let vStratRF = '';
    switch (x) {
        case 'Padua':
            vCounterRF > 3 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'IMPROVE':
            vCounterRF > 7 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'HAS_BLED':
            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'CHA2DS2_VASсOrRusSurgOrTraumRF':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : vStratRF = 'высокий';
            return vStratRF;
            break;

        case 'Caprini':
            vCounterRF == 0 ? vStratRF = 'низкий' : (vCounterRF >= 1 && vCounterRF <= 2) ? vStratRF = 'умеренный' : (vCounterRF >= 3 && vCounterRF <= 4) ? vStratRF = 'высокий' : vStratRF = 'очень высокий';
            return vStratRF;
            break;
        case 'SurgOrTraumBleedingRF':
            vCounterRF >= 1 ? vStratRF = 'высокий' : vStratRF = 'низкий';
            return vStratRF;
            break;
        case 'GreenTop37aRus':
            (vCounterRF > 0 && vCounterRF <= 2) ? vStratRF = 'умеренный': (vCounterRF > 2 && vCounterRF != 0) ? vStratRF = 'высокий' : '';
            //
            //            vCounterRF > 2 ? vStratRF = 'высокий' : vStratRF = 'умеренный';
            return vStratRF;
    }
}



$('#btnTwo').on('click', function () {
    $('#pTitleOfConclusion').show();

    (objPatient.pkGeneralListOfRF != '') ? $('<p>', {
        text: (objPatient.pkGeneralListOfRF + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_1')): '';

    (objPatient.pkAllChoosedOperations != '') ? $('<p>', {
        text: ('Операции:' + objPatient.pkAllChoosedOperations + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_1')): '';

    ($('#pTextCollector_1').children().length > 0) ? $('#pTextCollector_1').show(): '';

    (objBallsRiskVTE.vCounterPaduaScore > 3 && objPatient.pkValuesMedPfofile.includes(1)) ? $('<p>', {
        text: ('Padua: ' + bindBalls(objBallsRiskVTE.vCounterPaduaScore) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterPaduaScore, 'Padua') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';

    (objBallsRiskVTE.vCounterCHA2DS2_VASс >= 1 && objPatient.pkValuesMedPfofile.includes(2)) ? $('<p>', {
        text: ('CHA2DS2-VASс: ' + bindBalls(objBallsRiskVTE.vCounterCHA2DS2_VASс) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterCHA2DS2_VASс, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';

    (objBallsRiskVTE.vCounterCapriniRF >= 2 && objPatient.pkAllSurgProfiles == true) ? $('<p>', {
        text: ('Caprini: ' + bindBalls(objBallsRiskVTE.vCounterCapriniRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterCapriniRF, 'Caprini') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';

    (objBallsRiskVTE.vCounterRusSurgRF >= 1 && objPatient.pkAllSurgProfiles == true) ? $('<p>', {
        text: ('Российская риска ВТЭО в хирургии: ' + bindBalls(objBallsRiskVTE.vCounterRusSurgRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterRusSurgRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';

    (objBallsRiskVTE.vCounterRusTraumRF > 2 && objPatient.pkValuesMedPfofile.includes(4)) ? $('<p>', {
        text: ('Российская риска ВТЭО в травматологии: ' + bindBalls(objBallsRiskVTE.vCounterRusTraumRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterRusTraumRF, 'CHA2DS2_VASсOrRusSurgOrTraumRF') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';

    (objBallsRiskVTE.vCounterGreenTop37a > 0 && objPatient.pkGender === 0 && objPatient.pkValuesMedPfofile.includes(10)) ? $('<p>', {
        text: ('GreenTopGuideline37a: ' + bindBalls(objBallsRiskVTE.vCounterGreenTop37a) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterGreenTop37a, 'GreenTop37aRus') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';
    (objBallsRiskVTE.vCounterObstRuRF > 0 && objPatient.pkGender === 0 && objPatient.pkValuesMedPfofile.includes(10)) ? $('<p>', {
        text: ('Российская риска ВТЭО в акушерстве-гинекологии: ' + bindBalls(objBallsRiskVTE.vCounterObstRuRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterObstRuRF, 'GreenTop37aRus') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_2')): '';
    ($('#pTextCollector_2').children().length > 0) ? $('#pTextCollector_2').show(): '';



    (objBallsRiskVTE.vCounterIMPROVE > 7 && objPatient.pkValuesMedPfofile.includes(1)) ? $('<p>', {
        text: ('IMPROVE: ' + bindBalls(objBallsRiskVTE.vCounterIMPROVE) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterIMPROVE, 'IMPROVE') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_3')): '';
    (objBallsRiskVTE.vCounterHAS_BLED > 2 && objPatient.pkValuesMedPfofile.includes(2)) ? $('<p>', {
        text: ('HAS-BLED: ' + bindBalls(objBallsRiskVTE.vCounterHAS_BLED) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterHAS_BLED, 'HAS_BLED') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_3')): '';

    (objBallsRiskVTE.vCounterMajorBleedingScoreRF > 0 && objPatient.pkAllSurgProfiles == true) ? $('<p>', {
        text: ('Major Bleeding Score: ' + bindBalls(objBallsRiskVTE.vCounterMajorBleedingScoreRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterMajorBleedingScoreRF, 'SurgOrTraumBleedingRF') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_3')): '';

    (objBallsRiskVTE.vCounterTraumBleedingRF > 0 && objPatient.pkValuesMedPfofile.includes(4)) ? $('<p>', {
        text: ('... при больших травматологических вмешательствах: ' + bindBalls(objBallsRiskVTE.vCounterTraumBleedingRF) + '. Риск ' + countStratRF(objBallsRiskVTE.vCounterTraumBleedingRF, 'SurgOrTraumBleedingRF') + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_3')): '';

    (objBallsRiskVTE.vCounterObstBleedingRF > 0 && objPatient.pkGender === 0 && objPatient.pkValuesMedPfofile.includes(10)) ? $('<p>', {
        text: ('... в акушерстве-гинекологии: ' + bindBalls(objBallsRiskVTE.vCounterObstBleedingRF) + '.'),
        class: 'pTextContainer'
    }).appendTo($('#pTextCollector_3')): '';

    ($('#pTextCollector_3').children().length > 0 && $('#chkCalculateRiskOfBleeding').is(':checked')) ? $('#pTextCollector_3').show(): '';
    $('.pTextContainer:contains("высокий")').css({
        'color': 'red'
    });
    $('.pTextContainer:contains("умеренный")').css({
        'color': 'orange'
    });
})

$('#btnThree').on('click', function () {

    // console.log('Gender ' + objPatient.pkGender);
    // console.log('Age ' + objPatient.pkAge);
    // console.log('Height ' + objPatient.pkHeight);
    // console.log('Weight ' + objPatient.pkWeight);
    // console.log('Med Profile ' + objPatient.pkMedProfile);
    // console.log('RiskVTE ' + objPatient.pkRiskVTE);
    // console.log('CC ' + objPatient.pkCC);

    let arrStratRF = [0, 0, 0, [0, 0], 0];

    objPatient.pkMedProfile = 1;

    function getMainMedProfile() {

        objBallsRiskVTE.vCounterPaduaScore > 3 ? arrStratRF[1] = 2 : '';
        if (objPatient.pkValuesMedPfofile.includes(2)) {
            objBallsRiskVTE.vCounterCHA2DS2_VASс > 0 ? arrStratRF[2] = 2 : '';
        };
        if (objPatient.pkIsOrNoSurg) {
            objBallsRiskVTE.vCounterRusSurgRF >= 1 && objBallsRiskVTE.vCounterRusSurgRF <= 2 ? arrStratRF[3][0] = 1 : objBallsRiskVTE.vCounterRusSurgRF >= 3 ? arrStratRF[3][0] = 2 : '';
            objBallsRiskVTE.vCounterCapriniRF >= 1 && objBallsRiskVTE.vCounterCapriniRF <= 2 ? arrStratRF[3][1] = 1 : objBallsRiskVTE.vCounterCapriniRF >= 3 ? arrStratRF[3][1] = 2 : '';
        };
        if (objPatient.pkValuesMedPfofile.includes(4)) {
            objBallsRiskVTE.vCounterRusTraumRF >= 1 && objBallsRiskVTE.vCounterRusTraumRF <= 2 ? arrStratRF[4] = 1 : objBallsRiskVTE.vCounterRusTraumRF >= 2 ? arrStratRF[4] = 2 : '';
        };
        objBallsRiskVTE.vCounterObstRuRF == 2 ? arrStratRF[5] = 1 : objBallsRiskVTE.vCounterObstRuRF > 2 ? arrStratRF[5] = 2 : '';

        arrStratRF[3] = Math.max.apply(null, arrStratRF[3]);

        arrStratRF[1] === 2 ? (objPatient.pkMedProfile = 1, objPatient.pkRiskVTE = arrStratRF[1]) : '';
        arrStratRF[2] === 1 || arrStratRF[2] === 2 ? (objPatient.pkMedProfile = 2, objPatient.pkRiskVTE = arrStratRF[2]) : '';
        if (arrStratRF[1] === 0 && arrStratRF[2] === 0) {
            arrStratRF[3] >= 1 ? (objPatient.pkMedProfile = 3, objPatient.pkRiskVTE = arrStratRF[3]) : '';
            arrStratRF[4] >= 1 ? (objPatient.pkMedProfile = 4, objPatient.pkRiskVTE = arrStratRF[4]) : '';
            //    arrStratRF[3] === 2 ? objPatient.pkMedProfile = 3 : '';       arrStratRF[4] === 2 ? objPatient.pkMedProfile = 4 : '';
        };
        objPatient.pkDateOfChildbirth ? (objPatient.pkMedProfile = 5, objPatient.pkRiskVTE = arrStratRF[5]) : '';

        objPatient.pkRiskVTE = arrStratRF[objPatient.pkMedProfile];
        //        return objPatient.pkMedProfile;
        //        return [objPatient.pkMedProfile, objPatient.pkRiskVTE];
    }
    getMainMedProfile();

    console.log(objPatient.pkMedProfile);
    console.log(objPatient.pkRiskVTE);
    console.log(objPatient.pkSevereHepaticFailure);
    console.log(objPatient.pkHeartInsuff3_4);
    console.log(objPatient.pkIsOrNoSurg);
    console.log('Diabetes: ' + objPatient.pkDiabetes);
    console.log('vActiveUlcer: ' + objPatient.pkActiveUlcerOfStomachOrDuodenum);
    console.log('Chronic Dialysis: ' + objPatient.pkChronicDialysis);
    console.log('Artificial Heart Valve: ' + objPatient.pkArtificialHeartValve);
    console.log('Uncontrolled Systemic Hypertension: ' + objPatient.pkUncontrolledSystemicHypertension);
    console.log('Some Surg: ' + objPatient.pkPullOfSurg);
    console.log('Artroplasty: ' + objPatient.pkArtroplasty);

    delete objPatient.pkHeight;
    localStorage.removeItem("Patient");
    let serialObj = JSON.stringify(objPatient);
    localStorage.setItem("Patient", serialObj);

    // $(location).attr('href', '/vte_drug');

});