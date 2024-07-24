import {world, system} from "@minecraft/server"
import {ActionFormData} from "@minecraft/server-ui"

class IFOQBG { //IFOQBG = Items For Old Quest Book Gathering
    constructor(itemTypeID, hardnessLevel, stackSize = 64) {
        this.itemTypeID = itemTypeID
        this.stackSize = stackSize
        this.hardnessLevel = hardnessLevel
    }
}
class IFPOBF {
    constructor(typeId, hardnessLevel) {
        this.typeId = typeId
        this.hardnessLevel = hardnessLevel
    }
}
class IFPOBM {
    constructor(typeId, hardnessLevel) {
        this.typeId = typeId
        this.hardnessLevel = hardnessLevel
    }
}
let ifoqbAG = [new IFOQBG("minecraft:coal", 1), new IFOQBG("minecraft:iron_ingot", 2), new IFOQBG("minecraft:raw_iron", 1), new IFOQBG("minecraft:cobblestone", 0.5), new IFOQBG("minecraft:dirt", 0.1), new IFOQBG("minecraft:raw_gold", 3), new IFOQBG("minecraft:gold_ingot", 4), new IFOQBG("minecraft:lapis_lazuli", 1), new IFOQBG("minecraft:acacia:log", 2), new IFOQBG("minecraft:birch_log", 2), new IFOQBG("minecraft:dark_oak_log", 1), new IFOQBG("minecraft:oak_log", 1), new IFOQBG("minecraft:spruce_log", 0.5), new IFOQBG("minecraft:jungle_log", 2)]//Items For Old Quest Book Array Gathering
let ifoqbAF = []
let ifoqbAM = [new IFPOBM("minecraft:deepslate", 0.5), new IFPOBM("minecraft:stone", 0.25)]
console.warn(ifoqbAG.length)
function oqbAFD(player, variable, typeId, name, needVar, type, hardnessLevel = 1, variableA, typeIdA, nameA, needVarA, typeA, hardnessLevelA) {
    if (type == 0) {
        if (variable > 0) {
            new ActionFormData()
                .title("§cQuest GUI")
                .button("§eGather " + variable + " " + name + " - §5$" + Math.round(hardnessLevel * (variable/15)))
                .show(player).then(r => {
                    if (r.selection == 0) {
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity=0.."+(variable-1)+"}] run tellraw @s {\"rawtext\":[{\"text\":\"§cYou do not have enough items\"}]}")
                        player.runCommand("execute if entity @s[hasitem={item=" + typeId + ",quantity="+variable+"..}] run scoreboard players add @s oqbQC 1")
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
            .button("§eFarm " + variable + " " + name + " - §5" + hardnessLevel * (variable/15))
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
    if (type == 2) {}
}


world.beforeEvents.itemUse.subscribe((item) => {
    system.run(main)
    function main() {
        let player = item.source
        let heldItem = item.itemStack.typeId
        let qsChecker = world.scoreboard.getObjective("pqbQC").getScore(player);
        if (heldItem == "void:old_quest_book" && qsChecker >= 30) {
            let wheat = world.scoreboard.getObjective("wheat").getScore(player);
            let coalNeeded = world.scoreboard.getObjective("coal_needed").getScore(player);
            let ironIngotNeeded = world.scoreboard.getObjective("iron_ingot_needed").getScore(player);
            let rawIronNeeded = world.scoreboard.getObjective("raw_iron_needed").getScore(player);
            let cobblestoneNeeded = world.scoreboard.getObjective("cobblestone_needed").getScore(player);
            let dirtNeeded = world.scoreboard.getObjective("dirt_needed").getScore(player);
            let rawGoldNeeded = world.scoreboard.getObjective("raw_gold_needed").getScore(player);
            let goldIngotNeeded = world.scoreboard.getObjective("gold_ingot_needed").getScore(player);
            let lapisLazuliNeeded = world.scoreboard.getObjective("lapis_lazuli_needed").getScore(player);
            let acaciaLogNeeded = world.scoreboard.getObjective("acacia_log_needed").getScore(player);
            let birchLogNeeded = world.scoreboard.getObjective("birch_log_needed").getScore(player);
            let darkOakLogNeeded = world.scoreboard.getObjective("dark_oak_log_needed").getScore(player);
            let oakLogNeeded = world.scoreboard.getObjective("oak_log_needed").getScore(player);
            let spruceLogNeeded = world.scoreboard.getObjective("spruce_log_needed").getScore(player);
            let jungleLogNeeded = world.scoreboard.getObjective("jungle_log_needed").getScore(player);
            let wheatNeeded = world.scoreboard.getObjective("wheat_needed").getScore(player);
            let pqbQC = world.scoreboard.getObjective("pqbQC").getScore(player);
            let oqbQC = world.scoreboard.getObjective("oqbQC").getScore(player);
            let deepslateMined = world.scoreboard.getObjective("deepslate_mined").getScore(player);
            let deepslateMinedNeeded = world.scoreboard.getObjective("deepslate_mined_needed").getScore(player);
            let deepslateNeeded = world.scoreboard.getObjective("deepslate_needed").getScore(player);
            let stoneMined = world.scoreboard.getObjective("stone_mined").getScore(player);
            let stoneMinedNeeded = world.scoreboard.getObjective("stone_mined_needed").getScore(player);
            let zombieKilled = world.scoreboard.getObjective("zombie_killed").getScore(player);
            let zombieKilledNeeded = world.scoreboard.getObjective("zombie_killed_needed").getScore(player);
            let skeletonKilled = world.scoreboard.getObjective("skeleton_killed").getScore(player);
            let skeletonKilledNeeded = world.scoreboard.getObjective("skeleton_killed_needed").getScore(player);
            let pigKilled = world.scoreboard.getObjective("pig_killed").getScore(player);
            let pigKilledNeeded = world.scoreboard.getObjective("pig_killed_needed").getScore(player);
            let chickenKilled = world.scoreboard.getObjective("chicken_killed").getScore(player);
            let chickenKilledNeeded = world.scoreboard.getObjective("chicken_killed_needed").getScore(player);
            let sheepKilled = world.scoreboard.getObjective("sheep_killed").getScore(player);
            let sheepKilledNeeded = world.scoreboard.getObjective("sheep_killed_needed").getScore(player);
            let oakPlanksPlaced = world.scoreboard.getObjective("oak_planks_placed").getScore(player);
            let oakPlanksPlacedNeeded = world.scoreboard.getObjective("oak_planks_placed_needed").getScore(player);
            let sprucePlanksPlaced = world.scoreboard.getObjective("spruce_planks_placed").getScore(player);
            let sprucePlanksPlacedNeeded = world.scoreboard.getObjective("spruce_planks_placed_needed").getScore(player);
            let birchPlanksPlaced = world.scoreboard.getObjective("birch_planks_placed").getScore(player);
            let birchPlanksPlacedNeeded = world.scoreboard.getObjective("birch_planks_placed_needed").getScore(player);
            let junglePlanksPlaced = world.scoreboard.getObjective("jungle_planks_placed").getScore(player);
            let junglePlanksPlacedNeeded = world.scoreboard.getObjective("jungle_planks_placed_needed").getScore(player);
            let acaciaPlanksPlaced = world.scoreboard.getObjective("acacia_planks_placed").getScore(player);
            let acaciaPlanksPlacedNeeded = world.scoreboard.getObjective("acacia_planks_placed_needed").getScore(player);
            let darkOakPlanksPlaced = world.scoreboard.getObjective("dark_oak_planks_placed").getScore(player);
            let darkOakPlanksPlacedNeeded = world.scoreboard.getObjective("dark_oak_planks_placed_needed").getScore(player);
            let cobblestonePlaced = world.scoreboard.getObjective("cobblestone_placed").getScore(player);
            let cobblestonePlacedNeeded = world.scoreboard.getObjective("cobblestone_placed_needed").getScore(player);
            let carrotFarmed = world.scoreboard.getObjective("carrot_farmed").getScore(player);
            let carrotFarmedNeeded = world.scoreboard.getObjective("carrot_farmed_needed").getScore(player);
            let potatoFarmed = world.scoreboard.getObjective("potato_farmed").getScore(player);
            let potatoFarmedNeeded = world.scoreboard.getObjective("potato_farmed_needed").getScore(player);
            let beetrootFarmed = world.scoreboard.getObjective("beetroot_farmed").getScore(player);
            let beetrootFarmedNeeded = world.scoreboard.getObjective("beetroot_farmed_needed").getScore(player);
            
            if (
                wheat == 0 &&
                coalNeeded == 0 &&
                ironIngotNeeded == 0 &&
                rawIronNeeded == 0 &&
                cobblestoneNeeded == 0 &&
                dirtNeeded == 0 &&
                rawGoldNeeded == 0 &&
                goldIngotNeeded == 0 &&
                lapisLazuliNeeded == 0 &&
                acaciaLogNeeded == 0 &&
                birchLogNeeded == 0 &&
                darkOakLogNeeded == 0 &&
                oakLogNeeded == 0 &&
                spruceLogNeeded == 0 &&
                jungleLogNeeded == 0 &&
                wheatNeeded == 0 &&
                pqbQC == 0 &&
                oqbQC == 0 &&
                deepslateMined == 0 &&
                deepslateMinedNeeded == 0 &&
                deepslateNeeded == 0 &&
                stoneMined == 0 &&
                stoneMinedNeeded == 0 &&
                zombieKilled == 0 &&
                zombieKilledNeeded == 0 &&
                skeletonKilled == 0 &&
                skeletonKilledNeeded == 0 &&
                pigKilled == 0 &&
                pigKilledNeeded == 0 &&
                chickenKilled == 0 &&
                chickenKilledNeeded == 0 &&
                sheepKilled == 0 &&
                sheepKilledNeeded == 0 &&
                oakPlanksPlaced == 0 &&
                oakPlanksPlacedNeeded == 0 &&
                sprucePlanksPlaced == 0 &&
                sprucePlanksPlacedNeeded == 0 &&
                birchPlanksPlaced == 0 &&
                birchPlanksPlacedNeeded == 0 &&
                junglePlanksPlaced == 0 &&
                junglePlanksPlacedNeeded == 0 &&
                acaciaPlanksPlaced == 0 &&
                acaciaPlanksPlacedNeeded == 0 &&
                darkOakPlanksPlaced == 0 &&
                darkOakPlanksPlacedNeeded == 0 &&
                cobblestonePlaced == 0 &&
                cobblestonePlacedNeeded == 0 &&
                carrotFarmed == 0 &&
                carrotFarmedNeeded == 0 &&
                potatoFarmed == 0 &&
                potatoFarmedNeeded == 0 &&
                beetrootFarmed == 0 &&
                beetrootFarmedNeeded == 0
            ) {
                let randomB;
                if (!randomBStore) {
                    let randomBStore = randomB 
                }
                for (let i = 0; i < 2; i++) {
                randomB = Math.round(Math.random() * 15)
                if (i = 1) {}
                let randomA = Math.round(Math.random() * 15)
                let amountFG = Math.ceil(Math.random() * (ifoqbAG[randomB].stackSize / ifoqbAG[randomB].hardnessLevel) * 3)
                let amountFM = Math.ceil(Math.random() * (ifoqbAM[randomB].hardnessLevel*64 / ifoqbAM[randomB].hardnessLevel) * 3)
                if (randomA >= 0 && randomA <=13) {
                    let item = ifoqbAG[randomB].itemTypeID;
                    let modifiedItem = item.replace(/^minecraft:/, '');
                    let modifiedItemA = modifiedItem
                    .replace(/_/g, ' ') 
                    .replace(/\b(\w)(\w*)/g, (_, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
                    player.runCommand('scoreboard players set @s '+modifiedItem+'_needed '+amountFG);
                    console.warn("ho")            }
                    player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"§cQuest Initialized \n§aClick Again To See Your Quest!\"}]}")

                if(i = 2) {
                    let randomA = Math.round(Math.random() * 15)
                    let amountFG = Math.ceil(Math.random() * (ifoqbAG[randomB].stackSize / ifoqbAG[randomB].hardnessLevel) * 3)
                    let amountFM = Math.ceil(Math.random() * (ifoqbAM[randomB].hardnessLevel*64 / ifoqbAM[randomB].hardnessLevel) * 3)
                    if (randomA >= 0 && randomA <=13 && randomB != randomBStore) {
                        let item = ifoqbAG[randomB].itemTypeID;
                        let modifiedItem = item.replace(/^minecraft:/, '');
                        let modifiedItemA = modifiedItem
                        .replace(/_/g, ' ') 
                        .replace(/\b(\w)(\w*)/g, (_, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
                        player.runCommand('scoreboard players set @s '+modifiedItem+'_needed '+amountFG);

                    } else {i = i - 1}
                        player.runCommand("tellraw @s {\"rawtext\":[{\"text\":\"§cQuest Initialized \n§aClick Again To See Your Quest!\"}]}")
                }
                }
                oqbAFD(item.source, coalNeeded, "coal", "Coal", "coal_needed", 0, 1)
                oqbAFD(item.source, ironIngotNeeded, "iron_ingot", "Iron Ingot", "iron_ingot_needed", 0, 2)
            }
            }
                }
})

world.afterEvents.entityDie.subscribe((entity) => {
    system.run(main)
    function main() {
    let player = entity.damageSource.damagingEntity
    let entityKilled = entity.deadEntity.typeId
    entityKilled =entityKilled.replace(/^minecraft:/, '')

}
})