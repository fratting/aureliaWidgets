import Noty from 'noty';
import 'noty/lib/noty.css!'
import 'notifier/notifier.css!';

export class Notifier {
    display(messageInfo) {
        //if no message type or no match then info is the default
        this.color = 'rgb(2, 114, 171)';
        this.icon = 'fa-info-circle';

        if (messageInfo.type) {
            switch (messageInfo.type.toLowerCase()) {
                case 'error':
                    this.color = 'rgb(168, 11, 16)';
                    this.icon = 'fa-ban';
                    break;
                case 'warning':
                case 'warn':
                    this.color = 'rgb(219, 135, 8)';
                    this.icon = 'fa-warning';
                    break;
                case 'success':
                case 'successful':
                    this.color = 'rgb(15, 175, 85)';
                    this.icon = 'fa-check-circle';
                    break;
                case 'question':
                    this.color = 'rgb(65, 46, 117)';
                    this.icon = 'fa-question-circle';
            }
        }

        var noty = new Noty({
            theme: 'relax',
            type: 'alert',
            //buttons: [
                //Noty.button('YES', 'btn btn-success', function () {
                //    console.log('button 1 clicked');
                //}, { id: 'button1', 'data-status': 'ok' }),

                //Noty.button('NO', 'btn btn-error', function () {
                //    console.log('button 2 clicked');
                //    n.close();
                //})
                
            //],
            timeout: messageInfo.sticky ? false : 3500,
            visibilityControl: true,
            killer: messageInfo.clearOtherAlerts || false,
            layout: messageInfo.layout || 'topRight',
            progressBar: messageInfo.showProgressBar || false,
            text: messageInfo.message || '',
            animation: {
                open: 'noty_effects_open', // Animate.css class names
                close: 'noty_effects_close' // Animate.css class names
            },
            callbacks: {
                onTemplate: () => {
                    let doc = document;
                    let buttonRow = null;
                    if (messageInfo.buttons) {                       
                        buttonRow = doc.createElement("div");
                        buttonRow.className = "row";

                        let buttonCol = doc.createElement("div");
                        buttonCol.className = "col-xs-10 col-xs-offset-2 noty_buttons";

                        buttonRow.appendChild(buttonCol);

                        messageInfo.buttons.forEach(b => {
                            let button = document.createElement('button');
                            button.id = b.id;
                            button.className = "btn btn-notifier pull-right";
                            button.type = "button";
                            button.innerHTML = b.html;
                            
                            b.events.forEach(e => {
                                button.addEventListener(e.type, e.callBack, false);
                            });
                            
                            buttonCol.appendChild(button);
                        });
                    }

                    let container = doc.createElement("div");
                    container.id = "notifier";
                    container.className = "container-fluid shadow";
                    container.style.cssText = `border-color:${this.color};`;

                    let row = doc.createElement("div");
                    row.className = "row";
                    container.appendChild(row);

                    let iconCol = doc.createElement("div");
                    iconCol.className = "col-xs-2 icon-area no-float";
                    iconCol.style.cssText = `background-color:${this.color};`;
                    row.appendChild(iconCol);

                    let icon = doc.createElement("i");
                    icon.className = `fa ${this.icon}`;
                    iconCol.appendChild(icon);

                    

                    let contentCol = doc.createElement("div");
                    contentCol.className = "col-xs-10 noty_body no-float";
                    row.appendChild(contentCol);

                    let contentRow = doc.createElement("div");
                    contentRow.className = "row";
                    contentCol.appendChild(contentRow);

                    let messageCol = doc.createElement("div");
                    messageCol.className = "col-xs-12";
                    messageCol.innerHTML = `${noty.options.text}`;
                    contentRow.appendChild(messageCol);

                    if (buttonRow) {
                        contentCol.appendChild(buttonRow);
                    }                   

                    //remove any noty elements already present to override with our template
                    while(noty.barDom.firstChild){
                        noty.barDom.removeChild(noty.barDom.firstChild);
                    }
                    noty.barDom.appendChild(container);

                },
                onShow: () => {

                }
            }
        });
        noty.show();
    }
}