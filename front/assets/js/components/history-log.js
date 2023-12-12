import { checkHistoryLength, getHistory, getUserHistory, splitHistory} from "../functions/history.js";
import { getActiveUser } from "../functions/user.js";

export default class History extends HTMLElement {
    constructor(){
        super();
        console.log('getUserHistory :',getUserHistory(1));
        console.log('checkHistoryLength :',checkHistoryLength(1));
        console.log('splitHistory :',splitHistory());
    }

    connectedCallback(){

        const logs = getUserHistory(getActiveUser());
        
        const logRows = logs.map((log)=>{
            let msg ='';
            if(log.message === 'success') msg =  `${log.pkmName} a été capturé.`;
            if(log.message === 'fail') msg =  `${log.pkmName} s'est enfuit.`;
            if(log.message === 'release') msg =  `${log.pkmName} a été relâché.`;
            return `
                <tr>
                    <td>${log.date}</td>
                    <td>${msg}</td>
                </tr>
            `
        }).reverse().join("");

        const markup = `
            <table class="userLog">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${logRows}
                </tbody>
            </table>
        `;

        this.innerHTML = markup;
    }
}