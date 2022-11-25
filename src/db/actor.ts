import { query } from './db';

export type Actor = {
    actorId: number,
    firstname: string,
    lastname: string,
    lastupdate: string
}

export const getActors = async () => {
    const response = await query('SELECT * FROM actor LIMIT 100');
    return response.rows as Actor[][];
}

export const getActorById = async (actorId: string) => {
    const response = await query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
    return response.rows.length ? response.rows[0] as Actor[] : null;
}

export const insertActor = async (actor: Actor) => {
    const createdActor = await query('INSERT INTO actor(first_name, last_name, last_update) VALUES($1, $2, current_timestamp) RETURNING *', [actor.firstname, actor.lastname]);
    return createdActor.rows[0];
}

export const updateActor = async (actorId: string, actor: Actor) => {
    await query('UPDATE actor SET first_name=$1, last_name=$2, last_update=current_timestamp WHERE actor_id=$3 RETURNING *', [actor.firstname, actor.lastname, actorId]);
    return await getActorById(actorId);
}

export const deleteActor = async (actorId: string) => {
    return await query('DELETE FROM actor WHERE actor_id=$1', [actorId]);
}