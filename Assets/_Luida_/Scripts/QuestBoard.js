// const itemTemplateId = new ItemTemplateId("941a190d-c7a8-42d7-b6c9-bd0b3d127e35");
// const position = $.getPosition().clone();
// const rotation = new Quaternion().identity();
const data = ["Hello", "Cluster", "from", "Cyber", "Lab"];
const numberPerPage = 5;

$.onStart(() => {
    $.state.quests = [];
    let request = {type: "questList", number: numberPerPage};
    $.callExternal(JSON.stringify(request), "getQuestList");
});

$.onInteract(() => {
    let request = {type: "questList", number: numberPerPage};
    $.callExternal(JSON.stringify(request), "getQuestList");
});

$.onExternalCallEnd((res, meta, err) =>
{
    if (res == null) {
        $.log("callExternal ERROR: " + err);
        return;
    }

    if (meta === "getQuestList") {
        let parsedRes = JSON.parse(res);
        $.state.quests = parsedRes.quests;

        for(let i = 0; i < Math.min(parsedRes.quests.length, numberPerPage); i++)
        {
            const questTitle = $.subNode("Quest_" + i);
            if (questTitle) questTitle.setText(parsedRes.quests[i].title);
        }
    }
});

// $.onInteract(() => {
//     $.log("Welcome to Luida bar!");
//     for (let i = 0; i < Math.min(data.length, numberPerPage); i++) {
//         const quest = $.subNode("Quest_" + i);
//         if (quest) quest.setText(data[i]);
//         // TODO: create an item with interaction item trigger covering this subnode (quest) -> show details when this quest is clicked
//     }
//     // data.forEach((str) => {
//         // const item = $.createItem(itemTemplateId, position.add(new Vector3(0, 1, 0)), rotation);
//         // item.send("setTitle", str);
//     // });
// });