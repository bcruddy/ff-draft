window.ffd = {
    init () {
        const list = document.getElementById('list');
        const html = window.rankings.map(this.buildRow.bind(this)).join('');

        list.innerHTML = html;
    },

    buildRow (item, index) {
        const {Rank, Name, Team, Pos, Bye, Avg, ADP, 'vs. ADP': vsADP} = item;
        const style = this.styleRow(vsADP);

        return `<tr data-row="${index}">
            <td>${Rank}</td>
            <td>${Name}</td>
            <td>${Team}</td>
            <td>${Pos}</td>
            <td>${Bye}</td>
            <td>${Avg}</td>
            <td>${ADP}</td>
            <td style="${style}">${vsADP}</td>
            <td>
                <a href="#${index}" onclick="ffd.removeRow('${index}')">Remove</a>
            </td>
            <td>
                <a href="#${index}" onclick="ffd.draftPlayer('${index}')">Draft</a>
            </td>
        </tr>`;
    },

    styleRow (vsADP) {
        try {
            const val = vsADP.toString();

            if (val.indexOf('+') > -1) {
                return 'background-color: lightgreen';
            }

            if (val.indexOf('-') > -1) {
                return 'background-color: lightcoral'
            }
        } catch (ex) {}

        return '';
    },

    removeRow (index) {
        const row = document.querySelector(`[data-row="${index}"]`);

        if (row) {
            row.parentNode.removeChild(row);
        }
    },

    draftPlayer (index) {
        const draftedList = document.getElementById('drafted-players');
        const row = document.querySelector(`[data-row="${index}"]`);
        const clone = row.cloneNode(true);

        const toRemove = [
            clone.children[clone.children.length - 1],
            clone.children[clone.children.length - 2],
            clone.children[clone.children.length - 3],
            clone.children[clone.children.length - 4],
            clone.children[clone.children.length - 5]
        ];

        toRemove.forEach(node => {
            node.parentNode.removeChild(node);
        });

        draftedList.appendChild(clone);
        this.removeRow(index);
    }
};
