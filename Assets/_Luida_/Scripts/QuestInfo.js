let currentQuestID = -1;
let requestedQuestID = -1;

$.onUpdate(() => {
    requestedQuestID = $.getStateCompat("owner", "triggerQuest", "integer");
    if (currentQuestID !== requestedQuestID) {
        $.log("Request Quest!");
        let request = {type: "questInfo", id: requestedQuestID};
        $.callExternal(JSON.stringify(request), "getQuestInfo");
        currentQuestID = requestedQuestID;
    }
});

$.onExternalCallEnd((res, meta, err) =>
{
    if (res == null) {
        $.log("callExternal ERROR: " + err);
        currentQuestID = -1;
        requestedQuestID = -1;
        return;
    }

    if (meta === "getQuestInfo") {
        let parsedRes = JSON.parse(res);
        $.state.quests = parsedRes.quests;
        const quest = parsedRes.quest;

        $.log(quest.title);
        $.log(quest.description);
        $.log(quest.prerequisite);

        $.subNode("Title").setText(quest.title);
        $.subNode("Description").setText(quest.description);
        $.subNode("Prerequisite").setText(quest.prerequisite);
    }
});