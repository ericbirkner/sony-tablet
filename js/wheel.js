// JavaScript Document
$(function(){
        window.WHEELOFFORTUNE = {

            cache: {},

            init: function () {
                console.log('controller init...');

                var _this = this;
                this.cache.wheel = $('.wheel');
                this.cache.wheelMarker = $('.marker');
                this.cache.wheelSpinBtn = $('.wheel'); //im using the wheel as the spin button but simply change this to a button if you want.

                //mapping is backwards as wheel spins clockwise //1=win
                //this.cache.wheelMapping = [400, 120, 80, 750, 150, 300, 60, 175, 500, 125, 75, 1000, 120, 200, 90, 600, 100, 250].reverse();
				this.cache.wheelMapping = [1, 2, 3, 4, 5, 6].reverse();

				
                this.cache.wheelSpinBtn.on('click swipedown swiperight', function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('disabled')) _this.spin();
                });
				

                //reset wheel
                this.resetSpin();

                //setup prize events
                this.prizeEvents();
            },

            spin: function () {
                console.log('spinning wheel');

                var _this = this;

                // reset wheel
                this.resetSpin();

                //disable spin button while in progress
                this.cache.wheelSpinBtn.addClass('disabled');

                /*
                    Wheel has 10 sections.
                    Each section is 360/10 = 36deg.
                */
                var deg = 1500 + Math.round(Math.random() * 1500),
                    duration = 6000; //optimal 6 secs

                _this.cache.wheelPos = deg;

                //transition queuing
                //ff bug with easeOutBack
                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0)
                    .transition({
                    rotate: deg + 'deg'
                }, duration, 'easeOutCubic');

                //move marker
                _this.cache.wheelMarker.transition({
                    rotate: '-20deg'
                }, 0, 'snap');

                //just before wheel finish
                setTimeout(function () {
                    //reset marker
                    _this.cache.wheelMarker.transition({
                        rotate: '0deg'
                    }, 300, 'easeOutQuad');
                }, duration - 500);

                //wheel finish
                setTimeout(function () {
                    // did it win??!?!?!
                    var spin = _this.cache.wheelPos,
                        degrees = spin % 360,
                        percent = (degrees / 360) * 100,
                        segment = Math.ceil((percent / 6)),  //divided by number of segments
                        //win = _this.cache.wheelMapping[segment]; //zero based array
						win = 1;

                    console.log('spin = ' + spin);
                    console.log('degrees = ' + degrees);
                    console.log('percent = ' + percent);
                    console.log('segment = ' + segment);
                    
					if(degrees<=60){
							win = 6;
						}
						
						if((degrees>60)&&(degrees<=120)){
							win = 5;
						}
						
						if((degrees>120)&&(degrees<=180)){
							win = 4;
						}
						
						if((degrees>180)&&(degrees<=240)){
							win = 3;
						}
						
						if((degrees>240)&&(degrees<=315)){
							win = 2;
						}
						
						if((degrees>315)&&(degrees<=360)){
							win = 1;
						}
					
					console.log('win = ' + win);

                    //display dialog with slight delay to realise win or not.
                    setTimeout(function () {
						premio = win;
                        //alert('you won '+win+'!');
						//muestro el resultado y salgo
						navigator.notification.alert('Felicitaciones ganaste: '+premio, function(){ 
							$.mobile.changePage('#final',{transition: "flip"});
							agrega_registro();
						}, 'LG Likes¡','Siguiente');
                    }, 700);

                    //re-enable wheel spin
                    _this.cache.wheelSpinBtn.removeClass('disabled');

                }, duration);

            },

            resetSpin: function () {
                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0);
                this.cache.wheelPos = 0;
            }

        }

        window.WHEELOFFORTUNE.init();
});