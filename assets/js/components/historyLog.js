import { getUserHistory, splitHistory } from "../utils/history.js";
import { getActiveUser } from "../utils/user.js";

export default class History extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const rows = this.showAll();

        const markup = `
            <table class="userLog">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

        this.innerHTML = markup;
        this.showAll();
    }

    showOne(){
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
        return logRows;
    }

    showAll(){
        const logs = splitHistory();
        let rows ='';
        for (const tab in logs) {
            if (Object.hasOwnProperty.call(logs, tab)) {
                const logTab = logs[tab];
                const logRows = logTab.map((log)=>{
                    let msg='';
                    if(log.message === 'success') msg= `${log.name} a capturé ${log.pkmName}.`;
                    if(log.message === 'fail') msg= `${log.name}, ce gros naze, a laissé s'échapper ${log.pkmName}.`;
                    if(log.message === 'release') msg= `${log.name} dit adieu a ${log.pkmName} et lui rend sa liberté.`;
                    return `
                        <tr>
                            <td>${log.name}</td>
                            <td>${log.date}</td>
                            <td>${msg}</td>
                        </tr>
                    `
                }).reverse().join("");
                rows += logRows
            }
        }
        return rows;
    }
}