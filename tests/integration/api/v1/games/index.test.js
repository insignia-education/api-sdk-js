import {
    api,
    loginCustomer,
    loginAdmin,
    logout
} from '../../../../helpers.js';

describe('api/v1/games', () => {
    let gameId;

    afterAll(async () => {
        if (!gameId) return;
        await loginAdmin();
        await api.games.delete(gameId).catch(() => {});
    });

    test('create | unauthenticated is rejected', async () => {
        await logout().catch(() => {});
        await expect(api.games.create({ title: 'x', type: 'kahoot' })).rejects.toMatchObject({ status: 401 });
    });

    test('create | customer is rejected', async () => {
        await loginCustomer();
        await expect(api.games.create({ title: 'x', type: 'kahoot' })).rejects.toMatchObject({ status: 403 });
    });

    test('create | validation', async () => {
        await loginAdmin();
        await expect(api.games.create({ type: 'kahoot' })).rejects.toMatchObject({ status: 422 });
        await expect(api.games.create({ title: 'x' })).rejects.toMatchObject({ status: 422 });
        await expect(api.games.create({ title: 'x', type: 'bingo' })).rejects.toMatchObject({ status: 422 });
    });

    test('create, get, edit | admin', async () => {
        await loginAdmin();
        const game = await api.games.create({ title: 'SDK game', type: 'kahoot' });
        gameId = game.id;
        expect(game.status).toBe('draft');
        expect(game.type).toBe('kahoot');

        expect((await api.games.get(gameId)).id).toBe(gameId);
        expect((await api.games.edit(gameId, { status: 'lobby' })).status).toBe('lobby');
        await expect(api.games.edit(gameId, { status: 'paused' })).rejects.toMatchObject({ status: 422 });

        const players = await api.games.players(gameId);
        expect(players.map(p => p.role)).toEqual(['host']);
    });

    test('questions | create, disable, player view', async () => {
        await loginAdmin();
        const questions = api.games.questions(gameId);
        await expect(questions.create({ question: 'No options' })).rejects.toMatchObject({ status: 422 });

        const shown = await questions.create({
            question: 'Capital of France?',
            options: [{ text: 'Paris', is_correct: true }, { text: 'Rome', is_correct: false }],
        });
        const hidden = await questions.create({
            question: 'Disabled one',
            options: [{ text: 'A', is_correct: true }, { text: 'B', is_correct: false }],
            enabled: false,
        });
        expect((await questions.get()).length).toBe(2);
        expect((await questions.edit(hidden.id, { enabled: true })).enabled).toBe(true);
        await questions.edit(hidden.id, { enabled: false });

        await loginCustomer();
        await api.games.join(gameId);
        const visible = await api.games.questions(gameId).get();
        expect(visible.map(q => q.id)).toEqual([shown.id]);
        expect(visible[0].answer).toBeUndefined();
        expect(visible[0].options[0].is_correct).toBeUndefined();
        await expect(api.games.questions(gameId).create({ question: 'x' })).rejects.toMatchObject({ status: 403 });
    });

    test('share link | public info, guests and logged-in join', async () => {
        await loginAdmin();
        const game = await api.games.create({ title: 'Shared game', type: 'jeopardy' });
        const other = game.id;
        try {
            expect(game.share_token).toBeDefined();
            await api.games.edit(other, { status: 'lobby' });

            await logout().catch(() => {});
            const info = await api.games.shared(game.share_token).get();
            expect(info.title).toBe('Shared game');
            expect(info.share_token).toBeUndefined();
            await expect(api.games.shared('nope').get()).rejects.toMatchObject({ status: 404 });
            await expect(api.games.shared(game.share_token).guestJoin('Ana')).rejects.toMatchObject({ status: 403 });

            await loginAdmin();
            await api.games.edit(other, { allow_guests: true });
            await logout().catch(() => {});
            const guest = await api.games.shared(game.share_token).guestJoin('Ana');
            expect(guest.guest_token).toBeDefined();
            await expect(api.games.shared(game.share_token).guestJoin('')).rejects.toMatchObject({ status: 422 });
            expect(await api.games.shared(game.share_token).guestQuestions(guest.guest_token)).toEqual([]);
            await expect(api.games.shared(game.share_token).guestQuestions('wrong')).rejects.toMatchObject({ status: 403 });

            await loginCustomer();
            expect((await api.games.shared(game.share_token).join()).role).toBe('player');
        } finally {
            await loginAdmin();
            await api.games.delete(other).catch(() => {});
        }
    });
});
