$(function () {
    const elevatorNumber = 5;
    const upMove = 2;
    const downMove = 1;
    const unMove = 0;
    var planDirectionMove = unMove;
    var stop = 0;
    var stopSw = 0;
    var startPostion = 26;
    var currentMoveDistance = 26;
    var planMoveDistance = 26;
    var currentElevator = 1;
    var planUp = new Array(0, 0, 0, 0, 0);
    var planDown = new Array(0, 0, 0, 0, 0);
    var optionEleveator = new Array(0, 0, 0, 0, 0);
    var moveDistance = 0;
    var nextStop = 0;

    $('[name="down"]').on('click', function () {
        if (planDirectionMove == unMove) {
            planDirectionMove = downMove;
        }
        $(this).parent().css({ 'background-color': 'blue' });
        planDown[$(this).val() - 1] = 1;
    })

    $('[name="up"]').on('click', function () {
        if (planDirectionMove == unMove) {
            planDirectionMove = upMove;
        }
        $(this).parent().css({ 'background-color': 'red' });
        planUp[$(this).val() - 1] = 1;
    })

    $('input[type="button"]').on('click', function () {
        if (currentElevator != $(this).val()) {
            $(this).css({ 'background-color': 'yellow' });
            optionEleveator[$(this).val() - 1] = 1;
            console.log(optionEleveator);
        }
    })
    function searchAboveCurrent(array, current) {
        for (var i = current - 1; i < elevatorNumber; i++) {
            if (array[i]) {
                setPlanDestination(i);
                return 1;
            }
        }
        return 0;
    }

    function searchBelowCurrent(array, current) {
        for (var i = current - 1; i >= 0; i--) {
            if (array[i]) {
                setPlanDestination(i);
                return 1;
            }
        }
        return 0;
    }

    function setPlanDestination(i) {
        moveDistance = ((40) * (i - currentElevator + 1));
        nextStop = i + 1;
    }

    function nextPlanDestination() {
        moveDistance = 0;
        switch (planDirectionMove) {
            case upMove:
                if (searchAboveCurrent(planUp, 1)) {
                    planDirectionMove = upMove;
                }
                else if (searchAboveCurrent(optionEleveator, currentElevator)) {

                }
                else if (searchBelowCurrent(planDown, elevatorNumber)) {
                    planDirectionMove = downMove;
                }
                else if (searchBelowCurrent(optionEleveator, elevatorNumber)) {
                    planDirectionMove = downMove;
                }
                else
                    planDirectionMove = unMove;
                break;
            case downMove:
                if (searchBelowCurrent(planDown, elevatorNumber)) {
                    planDirectionMove = downMove;
                }
                else if (searchBelowCurrent(optionEleveator, currentElevator)) {

                }
                else if (searchAboveCurrent(planUp, 1)) {
                    planDirectionMove = upMove;
                }
                else if (searchAboveCurrent(optionEleveator, 1)) {
                    planDirectionMove = upMove;
                }
                else
                    planDirectionMove = unMove;
                break;
            case unMove:

                break;
            default:
                break;
        }
        planMoveDistance = moveDistance + startPostion;
    }

    function moveTowardsDestination() {
        if (planMoveDistance > currentMoveDistance) {
            $('img.box').css({ 'margin-top': -currentMoveDistance })
            currentMoveDistance++;

        }
        else if (planMoveDistance < currentMoveDistance) {
            $('img.box').css({ 'margin-top': -currentMoveDistance })
            currentMoveDistance--;
        }
    }
    function ArriveDestination() {
        if (planMoveDistance == currentMoveDistance) {
            if (nextStop) {
                currentElevator = nextStop;
                startPostion = planMoveDistance;

                $('input[type="button"][value="' + currentElevator + '"]').css({ 'background-color': 'initial' });
                if (optionEleveator[currentElevator - 1]) {
                    optionEleveator[currentElevator - 1] = 0;
                }
                stop = 1;
                stopSw = 1;
                nextStop = 0;
                
            }
        }
    }
    function main() {

        
        if (!stop) {
            nextPlanDestination();
            moveTowardsDestination();
            ArriveDestination();
        }

        else {
            if (stopSw) {
                stopSw = 0;
                setTimeout(function () {
                    switch (planDirectionMove) {
                        case upMove:
                            if (currentElevator) {
                                planUp[currentElevator - 1] = 0;
                            }
                            $('input[name="up"][value="' + currentElevator + '"]').parent().css({ 'background-color': 'white' });
                            break;
                        case downMove:
                            if (currentElevator) {
                                planDown[currentElevator - 1] = 0;
                                $('input[name="down"][value="' + currentElevator + '"]').parent().css({ 'background-color': 'white' });
                            }
                            break;
                        case unMove:

                            break;
                    }
                    stop = 0;
                }, 2000)
            }
        }
    }

    var time = setInterval(main, 10);
})