window.ffd = {
    currentPick: 1,
    currentRound: 1,

    init () {
        const list = document.getElementById('list');
        const html = window.rankings.map(this.buildRow.bind(this)).join('');

        list.innerHTML = html;
    },

    buildRow (item, index) {
        index++;
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
                <a href="#" onclick="ffd.playerPicked('${index}')">Picked</a> | <a href="#" onclick="ffd.draftPlayer('${index}')">Draft</a>
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

        this.updatePick();
    },

    playerPicked (index) {
        const pickedList = document.getElementById('previous-picks');
        const row = document.querySelector(`[data-row="${index}"]`);
        const clone = row.cloneNode(true);

        this.cleanupPick(clone);

        pickedList.prepend(clone);
        this.removeRow(index);
    },

    draftPlayer (index) {
        const draftedList = document.getElementById('drafted-players');
        const row = document.querySelector(`[data-row="${index}"]`);
        const clone = row.cloneNode(true);

        this.cleanupPick(clone);

        draftedList.prepend(clone);
        this.removeRow(index);
    },

    cleanupPick (clone) {
        const toRemove = [
            clone.children[clone.children.length - 1],
            clone.children[clone.children.length - 2],
            clone.children[clone.children.length - 3],
            clone.children[clone.children.length - 4]
        ];

        toRemove.forEach(node => {
            node.parentNode.removeChild(node);
        });

        const td = document.createElement('td');
        td.textContent = [this.currentRound, this.currentPick].join(' - ');

        clone.prepend(td);
    },

    updatePick () {
        if (this.currentPick === 12) {
            this.currentPick = 1;
            this.currentRound++;
        } else {
            this.currentPick++;
        }

        const pickEl = document.getElementById('current-pick');
        const roundEl = document.getElementById('current-round');

        pickEl.textContent = this.currentPick;
        roundEl.textContent = this.currentRound;
    }
};
