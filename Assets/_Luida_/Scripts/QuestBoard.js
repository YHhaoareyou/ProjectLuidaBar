// const itemTemplateId = new ItemTemplateId("941a190d-c7a8-42d7-b6c9-bd0b3d127e35");
// const position = $.getPosition().clone();
// const rotation = new Quaternion().identity();
const data = ["Hello", "Cluster", "from", "Cyber", "Lab"];
$.onInteract(() => {
    $.log("Welcome to Luida bar!");
    for (let i = 0; i < data.length; i++) {
        const quest = $.subNode("Quest_" + i);
        if (quest) quest.setText(data[i]);
        // TODO: create an item with interaction item trigger covering this subnode (quest) -> show details when this quest is clicked
    }
    // data.forEach((str) => {
        // const item = $.createItem(itemTemplateId, position.add(new Vector3(0, 1, 0)), rotation);
        // item.send("setTitle", str);
    // });
});