import log from 'electron-log';
import { rpc } from '../lib/rpc';
import { toNumber } from '../lib/convert';
import { waitForServices, intervalRates } from '../store/store';
import { ipcRenderer } from 'electron';

let watchingHeight = false;

export function loadHeight(watch) {
    return (dispatch) =>
        rpc.call('eth_blockNumber', []).then((result) => {
            dispatch({
                type: 'NETWORK/BLOCK',
                height: result,
            });
            if (watch && !watchingHeight) {
                watchingHeight = true;
                setTimeout(() => dispatch(loadHeight(true)), intervalRates.continueLoadHeightRate);
            }
        });
}

export function loadNetworkVersion() {
    return (dispatch, getState) =>
        rpc.call('net_version', []).then((result) => {
            if (getState().network.get('chain').get('id') !== result) {
                dispatch({
                    type: 'NETWORK/SWITCH_CHAIN',
                    id: result,
                    rpc: getState().launcher.getIn(['chain', 'rpc']),
                });
            }
        });
}

export function loadPeerCount() {
    return (dispatch, getState) =>
        rpc.call('net_peerCount', []).then((result) => {
            if (getState().network.get('peerCount') !== toNumber(result)) {
                dispatch({
                    type: 'NETWORK/PEER_COUNT',
                    peerCount: result,
                });
            }
        });
}

export function loadSyncing() {
    return (dispatch, getState) => {
        const repeat = getState().launcher.getIn(['chain', 'rpc']) === 'local';
        rpc.call('eth_syncing', []).then((result) => {
            const syncing = getState().network.get('sync').get('syncing');
            if (typeof result === 'object') {
                if (!syncing) dispatch(loadNetworkVersion());
                dispatch({
                    type: 'NETWORK/SYNCING',
                    syncing: true,
                    status: result,
                });
                if (repeat) {
                    setTimeout(() => dispatch(loadSyncing()), intervalRates.continueLoadSyncRate);
                }
            } else {
                dispatch({
                    type: 'NETWORK/SYNCING',
                    syncing: false,
                });
                setTimeout(() => dispatch(loadHeight(true)), intervalRates.continueLoadSyncRate);
            }
        });
    };
}

export function switchChain(network, id) {
    return (dispatch) => {
        ipcRenderer.sendSync('switch-chain', network, id);
        waitForServices();
    };
}
