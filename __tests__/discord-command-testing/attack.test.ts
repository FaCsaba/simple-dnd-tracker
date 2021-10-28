import { messageHandler } from "../../src/handlers/";
import { Message } from 'discord.js';

let msg: Message = {
    author: {id: ""},
    content: "",
    channel: {
        send: jest.fn()
    }
} as unknown as Message

beforeEach(()=> {
    msg = {
            author: {id: ""},
            content: "",
            channel: {
                send: jest.fn()
            },
            delete: jest.fn()
        } as unknown as Message  
    });
    
describe("Incorrect uses of Attack", ()=>{
    test("Attack with no arguments", async ()=>{
        msg.content = "/attack";
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Not enough arguments for attack\./));
    });
    test("Attack with non existant creature", async ()=>{
        msg.content = "/attack a;slkdf"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Unknown creature/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Creatures: [a-z]+/));
    });

    test("Attack with no dice roll in to_hit", async ()=>{
        msg.content = "/attack test"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
expect.stringMatching(/No number or Dice number specified/));
    })

    test("Attack with incorret dice roll in to_hit", async ()=>{
        msg.content = "/attack test alskdf"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
expect.stringMatching(/is not a number nor a Dice number in AC to attack with\./));
    })

    test("Attack with no dice roll in damage", async ()=>{
        msg.content = "/attack test 1d20+4"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/No number or Dice number specified in amount to attack with\./));
      
    })

    test("Attack with incorrect dice roll in damage", async ()=>{
        msg.content = "/attack test 1d20+4 1dasdf+5"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/is not a number nor a Dice number in amount to attack with./));
      
    })
})

describe("Attack correctly", ()=>{
    test("Attack a creature if AC is high enough", async ()=>{
        msg.content = "/attack test 100 100"
        await messageHandler(msg)

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Rolled a 100:/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/It's a hit!/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/test got damaged by 100hp/));
    })

    test("Attack a creature with dice as AC", async ()=>{
        msg.content = "/attack test 1d20 100"
        await messageHandler(msg)

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Rolled a \[.+\]/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/a hit/));
    })

    test("Attack a creature with dice as Damage", async ()=>{
        msg.content = "/attack test 100 1d20"
        await messageHandler(msg)

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Rolled a 100/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/got damaged by \[.+\]/));
    })

    test("Attack a creature with both as Dice", async ()=>{
        msg.content = "/attack test \"1d20 + 1d30\" 1d20"
        await messageHandler(msg)

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Rolled a \[.+\]/));
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/(got damaged by \[.+\])|(It's not a hit\.)/));
    })
})