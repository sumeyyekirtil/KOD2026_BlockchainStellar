#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol,
};

/// Hata tiplerini tanımlıyoruz
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ContractError {
    NotInitialized = 1,
    AlreadyInitialized = 2,
}

/// Storage keyleri için enum
#[contracttype]
pub enum DataKey {
    Admin,
    Initialized,
    TotalScholar,
    TotalProject,
    UserScholar(Address),
    UserProject(Address),
}

#[contract]
pub struct GmGnCounter;

#[contractimpl]
impl GmGnCounter {
    /// --------------------------------------------------
    /// initialize
    /// --------------------------------------------------
    /// Contract'i ilk kez başlatır.
    /// Admin adresini kaydeder.
    /// Tüm sayaçları sıfırlar.
    pub fn initialize(env: Env, admin: Address) -> Result<(), ContractError> {
        // Daha önce initialize edilmiş mi kontrol ediyoruz
        if env
            .storage()
            .instance()
            .get::<_, bool>(&DataKey::Initialized)
            .unwrap_or(false)
        {
            return Err(ContractError::AlreadyInitialized);
        }

        // Admin doğrulaması (admin işlemi imzalamalı)
        admin.require_auth();

        // Instance storage'a admin ve initial state yazıyoruz
        env.storage()
            .instance()
            .set(&DataKey::Admin, &admin);

        env.storage()
            .instance()
            .set(&DataKey::Initialized, &true);

        env.storage()
            .instance()
            .set(&DataKey::TotalScholar, &0u64);

        env.storage()
            .instance()
            .set(&DataKey::TotalProject, &0u64);

        Ok(())
    }

    /// --------------------------------------------------
    /// fund_scholar
    /// --------------------------------------------------
    /// Kullanıcının scholar bağış sayısını artırır.
    /// Global scholar toplamını artırır.
    /// require_auth zorunludur.
    pub fn fund_scholar(env: Env, user: Address) -> Result<(), ContractError> {
        Self::require_initialized(&env)?;

        // Kullanıcı işlemi imzalamalı
        user.require_auth();

        // Global scholar sayısını al
        let total: u64 = env
            .storage()
            .instance()
            .get(&DataKey::TotalScholar)
            .unwrap_or(0);

        env.storage()
            .instance()
            .set(&DataKey::TotalScholar, &(total + 1));

        // Kullanıcı scholar sayısını al
        let user_key = DataKey::UserScholar(user.clone());

        let user_count: u64 = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or(0);

        env.storage()
            .persistent()
            .set(&user_key, &(user_count + 1));

        Ok(())
    }

    /// --------------------------------------------------
    /// fund_project
    /// --------------------------------------------------
    /// Kullanıcının project bağış sayısını artırır.
    /// Global project toplamını artırır.
    pub fn fund_project(env: Env, user: Address) -> Result<(), ContractError> {
        Self::require_initialized(&env)?;

        user.require_auth();

        let total: u64 = env
            .storage()
            .instance()
            .get(&DataKey::TotalProject)
            .unwrap_or(0);

        env.storage()
            .instance()
            .set(&DataKey::TotalProject, &(total + 1));

        let user_key = DataKey::UserProject(user.clone());

        let user_count: u64 = env
            .storage()
            .persistent()
            .get(&user_key)
            .unwrap_or(0);

        env.storage()
            .persistent()
            .set(&user_key, &(user_count + 1));

        Ok(())
    }

    /// --------------------------------------------------
    /// get_total_scholar
    /// --------------------------------------------------
    /// Global scholar sayısını döndürür
    pub fn get_total_scholar(env: Env) -> Result<u64, ContractError> {
        Self::require_initialized(&env)?;

        Ok(env
            .storage()
            .instance()
            .get(&DataKey::TotalScholar)
            .unwrap_or(0))
    }

    /// --------------------------------------------------
    /// get_total_project
    /// --------------------------------------------------
    /// Global project sayısını döndürür
    pub fn get_total_project(env: Env) -> Result<u64, ContractError> {
        Self::require_initialized(&env)?;

        Ok(env
            .storage()
            .instance()
            .get(&DataKey::TotalProject)
            .unwrap_or(0))
    }

    /// --------------------------------------------------
    /// get_user_stats
    /// --------------------------------------------------
    /// Kullanıcının (scholar, project) sayısını tuple olarak döndürür
    pub fn get_user_stats(
        env: Env,
        user: Address,
    ) -> Result<(u64, u64), ContractError> {
        Self::require_initialized(&env)?;

        let scholar: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::UserScholar(user.clone()))
            .unwrap_or(0);

        let project: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::UserProject(user))
            .unwrap_or(0);

        Ok((scholar, project))
    }

    /// --------------------------------------------------
    /// Internal Helper
    /// --------------------------------------------------
    fn require_initialized(env: &Env) -> Result<(), ContractError> {
        let initialized = env
            .storage()
            .instance()
            .get::<_, bool>(&DataKey::Initialized)
            .unwrap_or(false);

        if !initialized {
            return Err(ContractError::NotInitialized);
        }

        Ok(())
    }
}
