
import {world, system} from "@minecraft/server"
import {ActionFormData} from "@minecraft/server-ui"
export 
class IFPQBG { //IFPQBG = Items For Primitive Quest Book Gathering
    constructor(itemTypeID, hardnessLevel, stackSize = 64) {
        this.itemTypeID = itemTypeID
        this.stackSize = stackSize
        this.hardnessLevel = hardnessLevel
    }
}
class IFPQBF {
    constructor(typeId, hardnessLevel) {
        this.typeId = typeId
        this.hardnessLevel = hardnessLevel
    }
}

function pqbAFD(player, variable, typeId, name, needVar, type, hardnessLevel = 1) {
    if (type == 0) {
        if (variable > 0) {
            new ActionFormData()
                .title("§cQuest GUI")
                .button("§eGather " + variable + " " + name + " - §5$" + Math.round(hardnessLevel * (variable/15)))
                .show(player).then(r => {
                    if (r.selection == 0) {
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity=0.."+(variable-1)+"}] run tellraw @s {\"rawtext\":[{\"text\":\"§cYou do not have enough items\"}]}")
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run scoreboard players add @s pqbQC 1")
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run scoreboard players reset @s " + needVar)
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run tellraw @s {\"rawtext\":[{\"text\":\"§aQuest Completed\"}]}")
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run scoreboard players add @s infCoins " + Math.round(hardnessLevel * (variable/15)))
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run clear @s " + typeId + " 0 " + variable)
                    }   
                })
        }
    }
    if (type == 1) {
        if (variable > 0) {
        new ActionFormData()
            .title("§cQuest GUI")
            .button("§eFarm " + variable + " " + name + " - §5$" + Math.round(hardnessLevel * (variable/15)))
            .show(player).then(r => {
                if (r.selection == 0) {
                    player.runCommand("execute if entity @s[scores={" +typeId + "=0.." +(variable-1)+"}] run tellraw @s {\"rawtext\":[{\"text\":\"§cYou do not have enough items\"}]}")
                    player.runCommand("execute if entity @s[scores={" +typeId + "=" +variable+"..}] run scoreboard players add @s pqbQC 1")
                    player.runCommand("execute if entity @s[scores={" +typeId + "="+variable+"..}] run tellraw @s {\"rawtext\":[{\"text\":\"§aQuest Completed\"}]}")
                    player.runCommand("execute if entity @s[scores={" + typeId + "=" + variable + "..}] run tag @s remove "+ typeId)
                    player.runCommand("execute if entity @s[scores={" +typeId + "="+variable+"..}] run scoreboard players add @s infCoins " + Math.round(hardnessLevel * (variable/15)))
                    player.runCommand("execute if entity @s[scores={" +typeId + "="+variable+"..}] run scoreboard players reset @s " + needVar)
                    player.runCommand("execute if entity @s[scores={" +typeId + "="+variable+"..}] run scoreboard players reset @s " + typeId)
                
                }

        }
        )
    }
}
}

let ifpqbAG = [new IFPQBG("minecraft:coal", 3), new IFPQBG("minecraft:iron_ingot", 5), new IFPQBG("minecraft:raw_iron", 4), new IFPQBG("minecraft:cobblestone", 1), new IFPQBG("minecraft:dirt", 1)]//Items For Primitive Quest Book Array Gathering
let ifpqbAF = [new IFPQBF("minecraft:wheat", 2)]
/*Formula for how many items you can get from IFPQB
    (((stackSize * 3) / hardnessLevel) * 3) All rounded up
*/
world.beforeEvents.itemUse.subscribe((item) => {
    system.run(main)
    function main() {
    let player = item.source
    let itemType = item.itemStack.typeId    
    let coalNeeded = world.scoreboard.getObjective("coal_needed").getScore(player);
    let ironIngotNeeded = world.scoreboard.getObjective("iron_ingot_needed").getScore(player);
    let rawIronNeeded = world.scoreboard.getObjective("raw_iron_needed").getScore(player);
    let cobblestoneNeeded = world.scoreboard.getObjective("cobblestone_needed").getScore(player);
    let dirtNeeded = world.scoreboard.getObjective("dirt_needed").getScore(player);
    let wheatNeeded = world.scoreboard.getObjective("wheat_needed").getScore(player);
    let pqbQC = world.scoreboard.getObjective("pqbQC").getScore(player);
        if (itemType == "void:primitive_quest_book") {
        if (coalNeeded == 0 && ironIngotNeeded == 0 && rawIronNeeded == 0 && cobblestoneNeeded == 0 && dirtNeeded == 0 && wheatNeeded == 0 && pqbQC >= 30) {
            new ActionFormData()
                .title("§cQuest GUI")
                .body("§eYou have no Active Quests!\n This means you can get an Old Quest Book\n Make sure you have inventory space!")
                .button("§j§lGet Old Quest Book")
                .show(player).then(r => {
                    if (r.selection == 0) {
                        player.runCommand("give @s void:old_quest_book")
                        player.addTag("pqbC")
                    }
                })
        }
        let randomB = Math.round(Math.random() * 4)
        let randomA = Math.round(Math.random() * 6)
        let amountFG = Math.ceil(Math.random() * (ifpqbAG[randomB].stackSize / ifpqbAG[randomB].hardnessLevel) * 3)

        if (coalNeeded == 0 && ironIngotNeeded == 0 && rawIronNeeded == 0 && cobblestoneNeeded == 0 && dirtNeeded == 0 && wheatNeeded == 0 && pqbQC <= 29) {
            if (randomA == 0 || randomA == 1 || randomA == 2 || randomA == 3 || randomA == 4) {
                let item = ifpqbAG[randomB].itemTypeID;
                let modifiedItem = item.replace(/^minecraft:/, '');
                let modifiedItemA = modifiedItem
                  .replace(/_/g, ' ') 
                  .replace(/\b(\w)(\w*)/g, (_, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
                player.runCommand('scoreboard players set @s '+modifiedItem+'_needed '+amountFG);            }
                if (randomA == 5 || randomA == 6)
                {
                    player.runCommand("scoreboard players set @s wheat_needed " + Math.ceil(Math.random() * ((ifpqbAF[0].hardnessLevel*64) / (ifpqbAF[0].hardnessLevel) * 3)) )
                    player.addTag("wheat")
                    player.runCommand("scoreboard players reset @s wheat")
                }
                player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"§cQuest Initialized \n§aClick Again To See Your Quest!\"}]}")
        }
        pqbAFD(item.source, coalNeeded, "coal", "Coal", "coal_needed", 0, 3)
        pqbAFD(item.source, rawIronNeeded, "raw_iron", "Raw Iron", "raw_iron_needed", 0, 4)
        pqbAFD(item.source, ironIngotNeeded, "iron_ingot", "Iron Ingot", "iron_ingot_needed", 0, 5)
        pqbAFD(item.source, cobblestoneNeeded, "cobblestone", "Cobblestone", "cobblestone_needed", 0)
        pqbAFD(item.source, dirtNeeded, "dirt", "Dirt", "dirt_needed", 0)
        pqbAFD(item.source, wheatNeeded, "wheat", "Wheat", "wheat_needed", 1, 2)
    }
}
}
)
world.afterEvents.playerBreakBlock.subscribe((block) => {
    system.run(main)
    function main() {
    let player = block.player
    if (block.brokenBlockPermutation.type.id == "minecraft:wheat" && block.brokenBlockPermutation.getState('growth') == 7 && block.player.hasTag("wheat"))
        player.runCommand("scoreboard players add @s wheat 1")
    }
}
)