#![no_std]

use soroban_sdk::{
    contractimpl, contracterror, Env, BytesN, Address, panic_with_error,
};

pub const USER_GM_PREFIX: &[u8] = b"user_gm_";
pub const USER_GN_PREFIX: &[u8] = b"user_gn_";
pub const TOTAL_GM_KEY: &[u8] = b"total_gm";
pub const TOTAL_GN_KEY: &[u8] = b"total_gn";
pub const ADMIN_KEY: &[u8] = b"admin";

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum ContractError {
    NotAuthorized,
    NotInitialized,
}

pub struct GmGnCounter;

#[contractimpl]
impl GmGnCounter {
    // Initialize admin and total counters
    pub fn initialize(env: Env, admin: Address) -> Result<(), ContractError> {
        let storage = env.storage().persistent();
        if storage.has(&ADMIN_KEY.into()) {
            panic_with_error!(&env, ContractError::NotInitialized);
        }
        storage.set(&ADMIN_KEY.into(), &admin);
        storage.set(&TOTAL_GM_KEY.into(), &0u64);
        storage.set(&TOTAL_GN_KEY.into(), &0u64);
        Ok(())
    }

    // Increment GM counter
    pub fn gm(env: Env, user: Address) -> Result<(), ContractError> {
        let storage = env.storage().persistent();
        let mut total_gm: u64 = storage.get(&TOTAL_GM_KEY.into()).unwrap_or(Ok(0)).unwrap();
        total_gm += 1;
        storage.set(&TOTAL_GM_KEY.into(), &total_gm);

        let mut user_gm_key = BytesN::from_array(&env, &[
            USER_GM_PREFIX,
            &user.to_bytes(&env)
        ].concat());
        let mut user_gm: u64 = storage.get(&user_gm_key).unwrap_or(Ok(0)).unwrap();
        user_gm += 1;
        storage.set(&user_gm_key, &user_gm);

        Ok(())
    }

    // Increment GN counter
    pub fn gn(env: Env, user: Address) -> Result<(), ContractError> {
        let storage = env.storage().persistent();
        let mut total_gn: u64 = storage.get(&TOTAL_GN_KEY.into()).unwrap_or(Ok(0)).unwrap();
        total_gn += 1;
        storage.set(&TOTAL_GN_KEY.into(), &total_gn);

        let mut user_gn_key = BytesN::from_array(&env, &[
            USER_GN_PREFIX,
            &user.to_bytes(&env)
        ].concat());
        let mut user_gn: u64 = storage.get(&user_gn_key).unwrap_or(Ok(0)).unwrap();
        user_gn += 1;
        storage.set(&user_gn_key, &user_gn);

        Ok(())
    }

    // Read total counters
    pub fn get_stats(env: Env, user: Address) -> Result<(u64, u64, u64, u64), ContractError> {
        let storage = env.storage().persistent();

        let total_gm: u64 = storage.get(&TOTAL_GM_KEY.into()).ok_or(ContractError::NotInitialized)?;
        let total_gn: u64 = storage.get(&TOTAL_GN_KEY.into()).ok_or(ContractError::NotInitialized)?;

        let user_gm_key = BytesN::from_array(&env, &[
            USER_GM_PREFIX,
            &user.to_bytes(&env)
        ].concat());
        let user_gn_key = BytesN::from_array(&env, &[
            USER_GN_PREFIX,
            &user.to_bytes(&env)
        ].concat());

        let user_gm: u64 = storage.get(&user_gm_key).unwrap_or(Ok(0)).unwrap();
        let user_gn: u64 = storage.get(&user_gn_key).unwrap_or(Ok(0)).unwrap();

        Ok((total_gm, total_gn, user_gm, user_gn))
    }
}
