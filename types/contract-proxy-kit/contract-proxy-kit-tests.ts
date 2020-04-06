import { ethers } from 'ethers';

import CPK = require('contract-proxy-kit');

const web3 = {};

// $ExpectType 0
CPK.CALL;
// $ExpectType 1
CPK.DELEGATECALL;

const networkConfigEntry: CPK.NetworkConfigEntry = {
    masterCopyAddress: '0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4',
    proxyFactoryAddress: '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10',
    multiSendAddress: '0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F',
    fallbackHandlerAddress: '0xAa588d3737B611baFD7bD713445b314BD453a5C8',
};

// $ExpectError
const badEntry: CPK.NetworkConfigEntry = {
    masterCopyAddress: '0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4',
    multiSendAddress: '0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F',
    fallbackHandlerAddress: '0xAa588d3737B611baFD7bD713445b314BD453a5C8',
};


// $ExpectError
new CPK.CPKWeb3Provider();
// $ExpectError
new CPK.CPKWeb3Provider({});
// $ExpectType Promise<CPK.CPKWeb3Provider>
const web3Provider = new CPK.CPKWeb3Provider({ web3 });

// $ExpectError
new CPK.CPKEthersProvider();
// $ExpectError
new CPK.CPKEthersProvider({});
// $ExpectError
new CPK.CPKEthersProvider({ ethers });
// $ExpectError
new CPK.CPKEthersProvider({ signer });
// $ExpectType Promise<CPK.CPKEthersProvider>
const ethersProvider = new CPK.CPKEthersProvider({ ethers, signer: ethers.Wallet.createRandom() });


// $ExpectError
CPK.create();
// $ExpectError
CPK.create({});
// $ExpectType Promise<CPK>
CPK.create({ cpkProvider: web3Provider });
// $ExpectType Promise<CPK>
CPK.create({ cpkProvider: ethersProvider });
// $ExpectType Promise<CPK>
CPK.create({ cpkProvider: web3Provider, ownerAccount: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1' });
// $ExpectType Promise<CPK>
CPK.create({ cpkProvider: ethersProvider, ownerAccount: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1' });
// $ExpectError
CPK.create({
    ownerAccount: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    networks: { 4447: networkConfigEntry },
});
// $ExpectType Promise<CPK>
CPK.create({
    cpkProvider: web3Provider,
    networks: { 4447: networkConfigEntry },
});
// $ExpectType Promise<CPK>
CPK.create({
    cpkProvider: ethersProvider,
    networks: { 4447: networkConfigEntry },
});


CPK.create({ cpkProvider }).then(async cpk => {
    // $ExpectType CPK
    cpk;

    // $ExpectType string
    const ownerAccount = await cpk.getOwnerAccount();

    // $ExpectType string
    cpk.address;

    // $ExpectType TransactionResult
    const txObject = await cpk.execTransactions([
        {
            operation: CPK.CALL,
            to: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
            value: `${1e18}`,
            data: '0x',
        },
        {
            operation: CPK.CALL.toString(),
            to: '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
            value: `${1e18}`,
            data: '0x',
        },
    ]);

    // $ExpectType string
    txObject.hash;

    // $ExpectType object | undefined
    txObject.promiEvent;

    // $ExpectType TransactionResponse | undefined
    txObject.transactionResponse;

    // $ExpectType TransactionResult
    await cpk.execTransactions(
        [
            {
                operation: CPK.CALL.toString(),
                to: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
                value: `${1e18}`,
                data: '0x',
            },
            {
                operation: CPK.CALL,
                to: '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
                value: `${1e18}`,
                data: '0x',
            },
        ],
        { gasPrice: `${3e9}` },
    );

    // $ExpectType TransactionResult
    await cpk.execTransactions(
        [
            {
                to: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
                value: `${1e18}`,
            },
            {
                to: '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
                value: `${1e18}`,
            },
        ],
        { gasPrice: `${3e9}` },
    );
});
