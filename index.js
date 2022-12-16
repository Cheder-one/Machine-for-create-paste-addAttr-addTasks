// Заранее приношу извинения за причиненный моральный ущерб при проверке данного задания...
// Я увидел как в прошлом ответе добавляют элементы через функцию и решил тоже создать. Понимаю что так никто не делает и делать в принципе скорее всего незачем. Но я хотел реализовать что-то подобное,но не такое масштабное. Затем оно начало все усложняться и расти.
// Получился комбайн по созданию/добавлению элемента/назначению ему аттрибута и записи задач из массива 
// А потом я удивляюсь чего я так отстаю

function find(selector) {
    return document.querySelector(selector);
}

let pasteElem, giveValueAttribute;

function createElem (createdElem, tag) {
    if (!!createdElem) 
        createdElem = document.createElement(tag)
    
    pasteElem = function (toWhom, command, whichElemPaste = createdElem) {
        toWhom[command](whichElemPaste)
    }
    
    giveValueAttribute = function (atr, elem = createdElem) {
        if (!!atr.class)    elem.className = atr.class
        if (!!atr.type)     elem.type = atr.type
        if (!!atr.id)       elem.id = atr.id
        if (!!atr.for)      elem.htmlFor = atr.for
        if (!!atr.text)     elem.innerText = atr.text
        if (!!atr.dataName) elem.dataset[atr.dataName] = atr.dataValue
    }
}

const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Посмотреть новый урок по JavaScript"
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Выполнить тест после урока"
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Выполнить ДЗ после урока"
    }
];

let pageDesign = [
    tasksItem = {
        create: {a: 'tasksItem', b: 'div'},
        paste: {a: '.tasks-list', b: 'appendChild'},
        valueAtr: {
            class:"task-item",
            dataName: 'taskId', dataValue: '1',
        }
    },
    mainContainer = {
        create: {a: 'mainContainer', b: 'div'},
        paste: {a: '[data-task-id="1"]', b: 'appendChild'},
        valueAtr: {
            class:"task-item__main-container",
        }
    },
    mainContent = {
        create: {a: 'mainContent', b: 'div'},
        paste: {a: '[data-task-id="1"] .task-item__main-container', b: 'appendChild'},
        valueAtr: {
            class: "task-item__main-content",
        }
    },
    checkboxForm = {
        create: {a: 'checkboxForm', b: 'form'},
        paste: {a: '[data-task-id="1"] .task-item__main-content', b: 'appendChild'},
        valueAtr: {
            class: "checkbox-form",
        }
    },
    checkbox = {
        create: {a: 'checkbox', b: 'input'},
        paste: {a: '[data-task-id="1"] .checkbox-form', b: 'appendChild'},
        valueAtr: {
            class: "checkbox-form__checkbox",
            type:"checkbox",
            id:"1",
        }
    },
    task1 = {
        create: {a: 'task1', b: 'label'},
        paste: {a: '[data-task-id="1"] .checkbox-form', b: 'appendChild'},
        valueAtr: {
            for:"1",
        }
    },
    taskItemText = {
        create: {a: 'taskItemText', b: 'span'},
        paste: {a: '[data-task-id="1"] .task-item__main-content', b: 'appendChild'},
        valueAtr: {
            class:"task-item__text",
            text: "none",
        }
    },
    deleteButton = {
        create: {a: 'deleteButton', b: 'button'},
        paste: {a: '[data-task-id="1"] .task-item__main-container', b: 'appendChild'},
        valueAtr: {
            class:"task-item__delete-button default-button delete-button",
            dataName: 'dataDeleteTaskId', dataValue: '5',
            text:'Удалить',
        },
    },
]

function replaceBadId(renameEl, goodIdEl) {
    if (renameEl.indexOf('"') === -1) {
        return renameEl
    } 
    cutBeforeId = renameEl.indexOf('"')+1;
    cutAfterId = renameEl.indexOf('"', cutBeforeId)

    phrasePart_1 = renameEl.slice(0, cutBeforeId)
    phrasePart_2 = renameEl.slice(cutAfterId, renameEl.length)

    return renameEl = phrasePart_1 + goodIdEl + phrasePart_2
    //
    // боже какой кошмар, я не думал что мне придется делать такое
}

let archiveCopies = []
console.log(archiveCopies);

function callPageDesignArr() {
    return archiveCopies
}

function indexEl(arr, el) {
    return arr.indexOf(el)
}

let i_tasksItem = indexEl(pageDesign, tasksItem)
let i_checkbox = indexEl(pageDesign, checkbox)
let i_task1 = indexEl(pageDesign, task1)
let i_taskItemText = indexEl(pageDesign, taskItemText)

for (let i = 0; i < tasks.length; i++) {
    pageDesign.forEach(el => {
        
        pageDesign[i_tasksItem].valueAtr.dataValue = tasks[i].id;
        pageDesign[i_checkbox].valueAtr.id = tasks[i].id;
        pageDesign[i_task1].valueAtr.for = tasks[i].id;
        pageDesign[i_taskItemText].valueAtr.text = tasks[i].text;

        el.paste.a = replaceBadId(el.paste.a, tasks[i].id);
        archiveCopies.push(  
            {
                create: {
                    ...el.create
                },
                paste: {
                    ...el.paste
                },
                valueAtr: {
                    ...el.valueAtr
                }
            }
        )
    });
}

for (const el of callPageDesignArr()) {
    createElem (el.create.a, el.create.b)
    pasteElem(find(el.paste.a), el.paste.b, );
    giveValueAttribute({
        class: el.valueAtr.class,
        type: el.valueAtr.type,
        id: el.valueAtr.id,
        for: el.valueAtr.for,
        text: el.valueAtr.text,
        dataName: el.valueAtr.dataName, 
        dataValue: el.valueAtr.dataValue,
    }, );
}

//
// Если проверяющий подумает что я немного не в себе.. То наверное он не ошибется

// createElem('tasksItem', 'div');
// pasteElem(find('.tasks-list'), 'appendChild', );
// giveValueAttribute({
//     class:"task-item",
//     dataName: 'taskId', dataValue: '2',
// }, );

// createElem('mainContainer', 'div');
// pasteElem(find('[data-task-id="2"]'), 'appendChild', );
// giveValueAttribute({
//     class:"task-item__main-container",
// }, );

// createElem('mainContent', 'div');
// pasteElem(find('[data-task-id="2"] .task-item__main-container'), 'appendChild', );
// giveValueAttribute({
//     class:"task-item__main-content",
// }, );

// createElem('checkboxForm', 'form');
// pasteElem(find('[data-task-id="2"] .task-item__main-content'), 'appendChild', );
// giveValueAttribute({
//     class:"checkbox-form",
// }, );

// createElem('checkbox', 'input');
// pasteElem(find('[data-task-id="2"] .checkbox-form'), 'appendChild', );
// giveValueAttribute({
//     class:"checkbox-form__checkbox",
//     type:"checkbox",
//     id:"2",
// }, );

// createElem('task1', 'label');
// pasteElem(find('[data-task-id="2"] .checkbox-form'), 'appendChild', );
// giveValueAttribute({
//     for:"2",
// }, );

// createElem('taskItemText', 'span');
// pasteElem(find('[data-task-id="2"] .task-item__main-content'), 'appendChild', );
// giveValueAttribute({
//     class:"task-item__text",
//     text:'Посмотреть новый урок по JavaScript',
// }, );

// createElem('deleteButton', 'button');
// pasteElem(find('[data-task-id="2"] .task-item__main-container'), 'appendChild', );
// giveValueAttribute({
//     class:"task-item__delete-button default-button delete-button",
//     dataName: 'dataDeleteTaskId', dataValue: '5',
//     text:'Удалить',
// }, );
